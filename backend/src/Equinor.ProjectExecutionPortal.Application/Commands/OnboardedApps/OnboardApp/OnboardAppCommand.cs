using Equinor.ProjectExecutionPortal.Application.Services.ContextTypeService;
using Equinor.ProjectExecutionPortal.Application.Services.FusionAppsService;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.OnboardedApps.OnboardApp;

public class OnboardAppCommand : IRequest<Guid>
{
    public OnboardAppCommand(string appKey, IList<string>? contextTypes)
    {
        AppKey = appKey;
        ContextTypes = contextTypes;
    }

    public string AppKey { get; }
    public IList<string>? ContextTypes { get; set; }

    public class Handler : IRequestHandler<OnboardAppCommand, Guid>
    {
        private readonly IReadWriteContext _readWriteContext;
        private readonly IFusionAppsService _fusionAppsService;
        private readonly IContextTypeService _contextTypeService;

        public Handler(IReadWriteContext readWriteContext, IFusionAppsService fusionAppsService, IContextTypeService contextTypeService)
        {
            _readWriteContext = readWriteContext;
            _fusionAppsService = fusionAppsService;
            _contextTypeService = contextTypeService;
        }

        public async Task<Guid> Handle(OnboardAppCommand command, CancellationToken cancellationToken)
        {
            if (!await _fusionAppsService.FusionAppExist(command.AppKey, cancellationToken))
            {
                throw new NotFoundException($"Could not locate app '{command.AppKey}' in Fusion.");
            }

            var onboardedAppExists = await _readWriteContext.Set<OnboardedApp>()
                .AsNoTracking()
                .AnyAsync(x => x.AppKey == command.AppKey, cancellationToken);

            if (onboardedAppExists)
            {
                throw new InvalidActionException($"Onboarded app: {command.AppKey} is already onboarded");
            }

            var onboardedApp = new OnboardedApp(command.AppKey);

            try
            {
                onboardedApp.AddContextTypes(await _contextTypeService.GetAllowedContextTypesByKeys(command.ContextTypes, cancellationToken));
            }
            catch (InvalidActionException ex)
            {
                throw new InvalidOperationException(ex.Message);
            }

            _readWriteContext.Set<OnboardedApp>().Add(onboardedApp);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return onboardedApp.Id;
        }
    }
}