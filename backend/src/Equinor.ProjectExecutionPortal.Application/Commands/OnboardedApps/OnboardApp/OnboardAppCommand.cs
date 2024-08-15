using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.Application.Services.ContextTypeService;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.OnboardedApps.OnboardApp;

public class OnboardAppCommand : IRequest<Guid>
{
    public OnboardAppCommand(string appKey, bool isLegacy, IList<string>? contextTypes)
    {
        AppKey = appKey;
        IsLegacy = isLegacy;
        ContextTypes = contextTypes;
    }

    public string AppKey { get; }
    public bool IsLegacy { get; }
    public IList<string>? ContextTypes { get; set; }

    public class Handler : IRequestHandler<OnboardAppCommand, Guid>
    {
        private readonly IReadWriteContext _readWriteContext;
        private readonly IAppService _appService;
        private readonly IContextTypeService _contextTypeService;

        public Handler(IReadWriteContext readWriteContext, IAppService appService, IContextTypeService contextTypeService)
        {
            _readWriteContext = readWriteContext;
            _appService = appService;
            _contextTypeService = contextTypeService;
        }

        public async Task<Guid> Handle(OnboardAppCommand command, CancellationToken cancellationToken)
        {
            if (!await _appService.FusionAppExist(command.AppKey, cancellationToken))
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

            var onboardedApp = new OnboardedApp(command.AppKey, 0, command.IsLegacy);
            
            try
            {
                onboardedApp.AddContextTypes(await _contextTypeService.GetContextTypesByContextTypeKey(command.ContextTypes, cancellationToken));
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
