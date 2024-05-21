using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.Portals.RemoveContextTypeFromPortal;

public class RemoveContextTypeFromPortalCommand : IRequest
{
    public RemoveContextTypeFromPortalCommand(Guid workSurfaceId, string contextType)
    {
        WorkSurfaceId = workSurfaceId;
        ContextType = contextType;
      
    }

    public Guid WorkSurfaceId { get; }
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
            var workSurfaceWithAllContextTypes = await _readWriteContext.Set<Portal>()
                .Include(x => x.ContextTypes)
                .FirstOrDefaultAsync(x => x.Id == command.WorkSurfaceId, cancellationToken);

            if (workSurfaceWithAllContextTypes == null)
            {
                throw new NotFoundException(nameof(Portal), command.WorkSurfaceId);
            }

            var contextTypeToRemove = workSurfaceWithAllContextTypes.ContextTypes.FirstOrDefault(x => x.ContextTypeKey.Equals(command.ContextType, StringComparison.InvariantCultureIgnoreCase));
            
            if (contextTypeToRemove == null)
            {
                throw new InvalidActionException($"Context-type: {command.ContextType} is not enabled on portal ");
            }

            workSurfaceWithAllContextTypes.RemoveContextType(contextTypeToRemove);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

        }
    }
}
