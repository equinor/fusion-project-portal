using Equinor.ProjectExecutionPortal.Application.Services.ContextService;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.Portals.RemoveContextAppFromPortal;

public class RemoveContextAppFromPortalCommand : IRequest
{
    public RemoveContextAppFromPortalCommand(Guid portalId, Guid contextId, string appKey)
    {
        PortalId = portalId;
        ContextId = contextId;
        AppKey = appKey;
    }

    public Guid PortalId { get; }
    public Guid ContextId { get; }
   
    public string AppKey { get; }

    public class Handler : IRequestHandler<RemoveContextAppFromPortalCommand>
    {
        private readonly IReadWriteContext _readWriteContext;
        private readonly IContextService _contextService;

        public Handler(IReadWriteContext readWriteContext, IContextService contextService)
        {
            _readWriteContext = readWriteContext;
            _contextService = contextService;
        }

        public async Task Handle(RemoveContextAppFromPortalCommand command, CancellationToken cancellationToken)
        {
            var fusionContext = await _contextService.GetFusionContext(command.ContextId, cancellationToken);
            
            if (fusionContext == null)
            {
                throw new InvalidActionException($"Cannot delete app '{command.AppKey} from '{command.PortalId}'. Invalid context-id.");
            }

            var portalApp = await _readWriteContext.Set<PortalApp>()
                .Include(x => x.OnboardedApp)
                .Include(x => x.OnboardedContext)
                .FirstOrDefaultAsync(x =>
                        x.OnboardedContext != null
                        && x.PortalId == command.PortalId
                        && x.OnboardedContext.ExternalId == fusionContext.ExternalId
                        && x.OnboardedContext.Type == fusionContext.Type.Name
                        && x.OnboardedApp.AppKey == command.AppKey,
                    cancellationToken);

            if (portalApp == null)
            {
                throw new NotFoundException(nameof(PortalApp), command.AppKey);
            }

            _readWriteContext.Set<PortalApp>().Remove(portalApp);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

        }
    }
}
