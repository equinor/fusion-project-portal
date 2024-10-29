using Equinor.ProjectExecutionPortal.Application.Services.ContextTypeService;
using Equinor.ProjectExecutionPortal.Application.Services.FusionAppsService;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.OnboardedApps.OnboardApp;

public class OnboardAppCommand(string appKey, IList<string>? contextTypes) : IRequest<Guid>
{
    public string AppKey { get; } = appKey;
    public IList<string>? ContextTypes { get; set; } = contextTypes;

    public class Handler(
        IReadWriteContext readWriteContext,
        IFusionAppsService fusionAppsService,
        IContextTypeService contextTypeService)
        : IRequestHandler<OnboardAppCommand, Guid>
    {
        public async Task<Guid> Handle(OnboardAppCommand command, CancellationToken cancellationToken)
        {
            if (!await fusionAppsService.FusionAppExist(command.AppKey, cancellationToken))
            {
                throw new NotFoundException($"Could not locate app '{command.AppKey}' in Fusion.");
            }

            var onboardedAppExists = await readWriteContext.Set<OnboardedApp>()
                .AsNoTracking()
                .AnyAsync(x => x.AppKey == command.AppKey, cancellationToken);

            if (onboardedAppExists)
            {
                throw new InvalidActionException($"Onboarded app: {command.AppKey} is already onboarded");
            }

            var onboardedApp = new OnboardedApp(command.AppKey);

            try
            {
                onboardedApp.AddContextTypes(await contextTypeService.GetAllowedContextTypesByKeys(command.ContextTypes, cancellationToken));
            }
            catch (InvalidActionException ex)
            {
                throw new InvalidOperationException(ex.Message);
            }

            readWriteContext.Set<OnboardedApp>().Add(onboardedApp);

            await readWriteContext.SaveChangesAsync(cancellationToken);

            return onboardedApp.Id;
        }
    }
}
