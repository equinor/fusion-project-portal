using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.AddWorkSurfaceApp;

public class AddWorkSurfaceAppCommand : IRequest<Unit>
{
    public AddWorkSurfaceAppCommand(Guid workSurfaceId, string? contextExternalId, string? contextType, string appKey, Guid? appGroupId, int order)
    {
        WorkSurfaceId = workSurfaceId;
        ContextExternalId = contextExternalId;
        ContextType = contextType;
        AppKey = appKey;
        Order = order;
        AppGroupId = appGroupId;
    }

    public Guid WorkSurfaceId { get; }
    public string? ContextExternalId { get; }
    public string? ContextType { get; }
    public string AppKey { get; }
    public Guid? AppGroupId { get; }
    public int Order { get; }

    public class Handler : IRequestHandler<AddWorkSurfaceAppCommand, Unit>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task<Unit> Handle(AddWorkSurfaceAppCommand command, CancellationToken cancellationToken)
        {
            if (command.ContextExternalId != null && command.ContextType != null)
            {
                await AddContextAppToWorkSurface(command, cancellationToken);
            }
            else
            {
                await AddGlobalAppToWorkSurface(command, cancellationToken);
            }

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }

        private async Task AddGlobalAppToWorkSurface(AddWorkSurfaceAppCommand command, CancellationToken cancellationToken)
        {
            var workSurfaceWithGlobalApps = await _readWriteContext.Set<WorkSurface>()
                .Include(x => x.Apps.Where(app => app.ExternalId == null))
                .FirstOrDefaultAsync(x => x.Id == command.WorkSurfaceId, cancellationToken);

            if (workSurfaceWithGlobalApps == null)
            {
                throw new NotFoundException(nameof(WorkSurface), command.WorkSurfaceId);
            }

            var onboardedApp = await _readWriteContext.Set<OnboardedApp>()
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.AppKey == command.AppKey, cancellationToken);

            if (onboardedApp == null)
            {
                throw new NotFoundException(nameof(OnboardedApp), command.AppKey);
            }

            if (workSurfaceWithGlobalApps.Apps.Any(x => x.OnboardedAppId == onboardedApp.Id))
            {
                throw new InvalidActionException($"App {onboardedApp.AppKey} have already been added to this Work Surface.");
            }

            var workSurfaceApp = new WorkSurfaceApp(onboardedApp.Id, command.AppGroupId, command.Order, command.WorkSurfaceId);

            workSurfaceWithGlobalApps.AddApp(workSurfaceApp);
        }

        private async Task AddContextAppToWorkSurface(AddWorkSurfaceAppCommand command, CancellationToken cancellationToken)
        {
            if (command.ContextExternalId == null || command.ContextType == null)
            {
                throw new InvalidActionException($"Cannot add global app '{command.AppKey} to '{command.WorkSurfaceId}'. Missing context parameters.");
            }

            var workSurfaceWithContextApps = await _readWriteContext.Set<WorkSurface>()
                .Include(x => x.Apps.Where(app => app.ExternalId == command.ContextExternalId))
                .FirstOrDefaultAsync(x => x.Id == command.WorkSurfaceId, cancellationToken);

            if (workSurfaceWithContextApps == null)
            {
                throw new NotFoundException(nameof(WorkSurface), command.WorkSurfaceId);
            }

            var onboardedApp = await _readWriteContext.Set<OnboardedApp>()
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.AppKey == command.AppKey, cancellationToken);

            if (onboardedApp == null)
            {
                throw new NotFoundException(nameof(OnboardedApp), command.AppKey);
            }

            if (workSurfaceWithContextApps.Apps.Any(x => x.OnboardedAppId == onboardedApp.Id))
            {
                throw new InvalidActionException($"App {onboardedApp.AppKey} have already been added to this Work Surface.");
            }

            var workSurfaceApp = new WorkSurfaceApp(onboardedApp.Id, command.AppGroupId, command.Order, command.WorkSurfaceId, command.ContextExternalId, command.ContextType);

            workSurfaceWithContextApps.AddApp(workSurfaceApp);
        }
    }
}
