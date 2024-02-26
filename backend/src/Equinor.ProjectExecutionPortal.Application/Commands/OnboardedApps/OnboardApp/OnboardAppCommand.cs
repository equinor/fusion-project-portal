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
    public OnboardAppCommand(string appKey, bool isLegacy, Guid appGroupId, IList<string> contextTypes)
    {
        AppKey = appKey;
        IsLegacy = isLegacy;
        AppGroupId = appGroupId;
        ContextTypes = contextTypes;
    }

    public string AppKey { get; }
    public bool IsLegacy { get; }
    public Guid AppGroupId { get; }
    public IList<string> ContextTypes { get; set; }

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

            var appGroup = await _readWriteContext.Set<AppGroup>()
                .Include(x => x.Apps)
                .FirstOrDefaultAsync(x => x.Id == command.AppGroupId, cancellationToken);

            if (appGroup == null)
            {
                throw new NotFoundException($"App Group '{command.AppGroupId}' was not found");
            }

            var onboardedAppsCount = appGroup.Apps.Count;

            var onboardedApp = new OnboardedApp(command.AppKey, onboardedAppsCount, command.IsLegacy);

            onboardedApp.AddContextTypes(await _contextTypeService.GetContextTypesByContextTypeKey(command.ContextTypes, cancellationToken));

            appGroup.AddApp(onboardedApp);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return onboardedApp.Id;
        }
    }
}
