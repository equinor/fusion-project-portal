using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.AddGlobalWorkSurfaceApp;

public class AddGlobalWorkSurfaceAppCommand : IRequest<Unit>
{
    public AddGlobalWorkSurfaceAppCommand(Guid workSurfaceId, string appKey)
    {
        WorkSurfaceId = workSurfaceId;
        AppKey = appKey;
    }

    public Guid WorkSurfaceId { get; }
    public string AppKey { get; }

    public class Handler : IRequestHandler<AddGlobalWorkSurfaceAppCommand, Unit>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task<Unit> Handle(AddGlobalWorkSurfaceAppCommand command, CancellationToken cancellationToken)
        {
            var workSurfaceWithGlobalApps = await _readWriteContext.Set<WorkSurface>()
                .Include(x => x.Apps.Where(app => app.OnboardedContextId == null))
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

            var workSurfaceApp = new WorkSurfaceApp(onboardedApp.Id, command.WorkSurfaceId);

            workSurfaceWithGlobalApps.AddApp(workSurfaceApp);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
