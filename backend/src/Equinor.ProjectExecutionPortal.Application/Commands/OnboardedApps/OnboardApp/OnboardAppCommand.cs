using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.OnboardedApps.OnboardApp;

public class OnboardAppCommand : IRequest<Guid>
{
    public OnboardAppCommand(string appKey, Guid appGroupId)
    {
        AppKey = appKey;
        AppGroupId = appGroupId;
    }

    public string AppKey { get; }
    public Guid AppGroupId { get; }

    public class Handler : IRequestHandler<OnboardAppCommand, Guid>
    {
        private readonly IReadWriteContext _readWriteContext;
        private readonly IAppService _appService;

        public Handler(IReadWriteContext readWriteContext, IAppService appService)
        {
            _readWriteContext = readWriteContext;
            _appService = appService;
        }

        public async Task<Guid> Handle(OnboardAppCommand command, CancellationToken cancellationToken)
        {
            if (!await _appService.FusionAppExist(command.AppKey, cancellationToken))
            {
                throw new NotFoundException($"Could not locate app '{command.AppKey}' in Fusion.");
            }

            var existingOnboardedApp = await _readWriteContext.Set<OnboardedApp>()
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.AppKey == command.AppKey, cancellationToken);

            if (existingOnboardedApp != null)
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

            var onboardedApp = new OnboardedApp(command.AppKey, onboardedAppsCount);

            appGroup.AddApp(onboardedApp);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return onboardedApp.Id;
        }
    }
}
