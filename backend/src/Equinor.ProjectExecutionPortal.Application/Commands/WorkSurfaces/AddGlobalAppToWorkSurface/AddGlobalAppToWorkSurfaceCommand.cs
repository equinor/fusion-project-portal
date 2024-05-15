using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.AddGlobalAppToWorkSurface;

public class AddGlobalAppToWorkSurfaceCommand : IRequest<Unit>
{
    public AddGlobalAppToWorkSurfaceCommand(Guid workSurfaceId, string appKey, bool removeAppForContexts)
    {
        WorkSurfaceId = workSurfaceId;
        AppKey = appKey;
        RemoveAppForContexts = removeAppForContexts;
    }

    public Guid WorkSurfaceId { get; }
    public string AppKey { get; }

    /// <summary>
    /// When set to true, this will remove the app from all contexts where it has previously been specifically set.
    /// This is done to avoid conflict where we have both a global and contextual instance of the same app.
    /// If set to false and the app already has been added to specific contexts, adding will be prevented.
    /// </summary>
    public bool RemoveAppForContexts { get; }

    public class Handler : IRequestHandler<AddGlobalAppToWorkSurfaceCommand, Unit>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task<Unit> Handle(AddGlobalAppToWorkSurfaceCommand command, CancellationToken cancellationToken)
        {
            var workSurfaceWithAllApps = await _readWriteContext.Set<Portal>()
                .Include(x => x.Apps)
                .FirstOrDefaultAsync(x => x.Id == command.WorkSurfaceId, cancellationToken);

            if (workSurfaceWithAllApps == null)
            {
                throw new NotFoundException(nameof(Portal), command.WorkSurfaceId);
            }

            var onboardedApp = await _readWriteContext.Set<OnboardedApp>()
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.AppKey == command.AppKey, cancellationToken);

            if (onboardedApp == null)
            {
                throw new NotFoundException("Could not find any onboarded app with that id", command.AppKey);
            }

            if (workSurfaceWithAllApps.HasGlobalApp(onboardedApp.Id))
            {
                throw new InvalidActionException($"App {onboardedApp.AppKey} have already been added globally to this Work Surface.");
            }

            // Perform cleanup of all contextual instances of this app to avoid duplicates.
            if (workSurfaceWithAllApps.HasAppForAnyContexts(onboardedApp.Id))
            {
                if (command.RemoveAppForContexts)
                {
                    var allWorkSurfaceContextsWithApp = workSurfaceWithAllApps.Apps.Where(x => x.OnboardedAppId == onboardedApp.Id && x.IsContextual);

                    _readWriteContext.Set<WorkSurfaceApp>().RemoveRange(allWorkSurfaceContextsWithApp);
                }
                else
                {
                    throw new InvalidActionException($"App {onboardedApp.AppKey} already exists as a contextual app in this Work Surface. Contextual app must be removed before adding globally");
                }
            }

            var workSurfaceApp = new WorkSurfaceApp(onboardedApp.Id, command.WorkSurfaceId);

            workSurfaceWithAllApps.AddApp(workSurfaceApp);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
