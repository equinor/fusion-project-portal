using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.Portals.RemoveContextTypeFromPortal;

public class RemoveContextTypeFromPortalCommand : IRequest
{
    public RemoveContextTypeFromPortalCommand(Guid portalId, string contextType)
    {
        PortalId = portalId;
        ContextType = contextType;
      
    }

    public Guid PortalId { get; }
    public string ContextType { get; }

    public class Handler : IRequestHandler<RemoveContextTypeFromPortalCommand>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task Handle(RemoveContextTypeFromPortalCommand command, CancellationToken cancellationToken)
        {
            var portalWithAllContextTypes = await _readWriteContext.Set<Portal>()
                .Include(x => x.ContextTypes)
                .FirstOrDefaultAsync(x => x.Id == command.PortalId, cancellationToken);

            if (portalWithAllContextTypes == null)
            {
                throw new NotFoundException(nameof(Portal), command.PortalId);
            }

            var contextTypeToRemove = portalWithAllContextTypes.ContextTypes.FirstOrDefault(x => x.ContextTypeKey.Equals(command.ContextType, StringComparison.InvariantCultureIgnoreCase));
            
            if (contextTypeToRemove == null)
            {
                throw new InvalidActionException($"Context-type: {command.ContextType} is not enabled on portal ");
            }

            portalWithAllContextTypes.RemoveContextType(contextTypeToRemove);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

        }
    }
}
