using Equinor.ProjectExecutionPortal.Application.Services.ContextService;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.Portals.AddContextAppToPortal;

public class AddContextAppToPortalCommand : IRequest<Unit>
{
    public AddContextAppToPortalCommand(Guid workSurfaceId, Guid contextId, string appKey)
    {
        WorkSurfaceId = workSurfaceId;
        ContextId = contextId;
        AppKey = appKey;
    }

    public Guid WorkSurfaceId { get; }
    public Guid ContextId { get; }
    public string AppKey { get; }

    public class Handler : IRequestHandler<AddContextAppToPortalCommand, Unit>
    {
        private readonly IReadWriteContext _readWriteContext;
        private readonly IContextService _contextService;

        public Handler(IReadWriteContext readWriteContext, IContextService contextService)
        {
            _readWriteContext = readWriteContext;
            _contextService = contextService;
        }

        public async Task<Unit> Handle(AddContextAppToPortalCommand command, CancellationToken cancellationToken)
        {
            var fusionContext = await _contextService.GetFusionContext(command.ContextId, cancellationToken);
            
            if (fusionContext == null)
            {
                throw new InvalidActionException($"Cannot add app '{command.AppKey} to '{command.WorkSurfaceId}'. Missing context parameter.");
            }

            var onboardedContext = await _readWriteContext.Set<OnboardedContext>()
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.ExternalId == fusionContext.ExternalId && x.Type == fusionContext.Type.Name, cancellationToken);

            if (onboardedContext == null)
            {
                throw new NotFoundException("Could not find any onboarded context with id", command.ContextId);
            }

            var onboardedApp = await _readWriteContext.Set<OnboardedApp>()
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.AppKey == command.AppKey, cancellationToken);

            if (onboardedApp == null)
            {
                throw new NotFoundException("Could not find any onboarded app with id", command.AppKey);
            }

            var workSurfaceWithAllApps = await _readWriteContext.Set<Portal>()
                .Include(x => x.Apps
                    .Where(wsApp => wsApp.OnboardedContext == null || wsApp.OnboardedContext.Id == onboardedContext.Id))
                    .ThenInclude(x => x.OnboardedContext)
                .FirstOrDefaultAsync(x => x.Id == command.WorkSurfaceId, cancellationToken);

            if (workSurfaceWithAllApps == null)
            {
                throw new NotFoundException(nameof(Portal), command.WorkSurfaceId);
            }

            if (workSurfaceWithAllApps.HasGlobalApp(onboardedApp.Id))
            {
                throw new InvalidActionException($"App {onboardedApp.AppKey} have already been added to this Work Surface as a global app");
            }

            if (workSurfaceWithAllApps.HasAppForContext(onboardedApp.Id, onboardedContext.Id))
            {
                throw new InvalidActionException($"App {onboardedApp.AppKey} have already been added to this Work Surface and context");
            }

            var workSurfaceApp = new PortalApp(onboardedApp.Id, command.WorkSurfaceId, onboardedContext.Id);

            workSurfaceWithAllApps.AddApp(workSurfaceApp);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
