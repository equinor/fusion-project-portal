using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.RemoveContextTypeFromWorkSurface;

public class RemoveContextTypeFromWorkSurfaceCommand : IRequest
{
    public RemoveContextTypeFromWorkSurfaceCommand(Guid workSurfaceId, string contextType)
    {
        WorkSurfaceId = workSurfaceId;
        ContextType = contextType;
      
    }

    public Guid WorkSurfaceId { get; }
    public string ContextType { get; }

    public class Handler : IRequestHandler<RemoveContextTypeFromWorkSurfaceCommand>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task Handle(RemoveContextTypeFromWorkSurfaceCommand command, CancellationToken cancellationToken)
        {
            var workSurfaceWithAllContextTypes = await _readWriteContext.Set<WorkSurface>()
                .Include(x => x.ContextTypes)
                .FirstOrDefaultAsync(x => x.Id == command.WorkSurfaceId, cancellationToken);

            if (workSurfaceWithAllContextTypes == null)
            {
                throw new NotFoundException(nameof(WorkSurface), command.WorkSurfaceId);
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
