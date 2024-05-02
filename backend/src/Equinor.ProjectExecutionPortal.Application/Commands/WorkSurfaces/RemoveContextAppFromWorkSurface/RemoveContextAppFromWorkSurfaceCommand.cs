using Equinor.ProjectExecutionPortal.Application.Services.ContextService;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.RemoveContextAppFromWorkSurface;

public class RemoveContextAppFromWorkSurfaceCommand : IRequest
{
    public RemoveContextAppFromWorkSurfaceCommand(Guid workSurfaceId, Guid contextId, string appKey)
    {
        WorkSurfaceId = workSurfaceId;
        ContextId = contextId;
        AppKey = appKey;
    }

    public Guid WorkSurfaceId { get; }
    public Guid ContextId { get; }
   
    public string AppKey { get; }

    public class Handler : IRequestHandler<RemoveContextAppFromWorkSurfaceCommand>
    {
        private readonly IReadWriteContext _readWriteContext;
        private readonly IContextService _contextService;

        public Handler(IReadWriteContext readWriteContext, IContextService contextService)
        {
            _readWriteContext = readWriteContext;
            _contextService = contextService;
        }

        public async Task Handle(RemoveContextAppFromWorkSurfaceCommand command, CancellationToken cancellationToken)
        {
            var fusionContext = await _contextService.GetFusionContext(command.ContextId, cancellationToken);
            
            if (fusionContext == null)
            {
                throw new InvalidActionException($"Cannot delete app '{command.AppKey} from '{command.WorkSurfaceId}'. Invalid context-id.");
            }

            var workSurfaceApp = await _readWriteContext.Set<WorkSurfaceApp>()
                .Include(x => x.OnboardedApp)
                .Include(x => x.OnboardedContext)
                .FirstOrDefaultAsync(x =>
                        x.OnboardedContext != null
                        && x.WorkSurfaceId == command.WorkSurfaceId
                        && x.OnboardedContext.ExternalId == fusionContext.ExternalId
                        && x.OnboardedContext.Type == fusionContext.Type.Name
                        && x.OnboardedApp.AppKey == command.AppKey,
                    cancellationToken);

            if (workSurfaceApp == null)
            {
                throw new NotFoundException(nameof(WorkSurfaceApp), command.AppKey);
            }

            _readWriteContext.Set<WorkSurfaceApp>().Remove(workSurfaceApp);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

        }
    }
}
