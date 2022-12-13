using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.ReorderAppGroups;

public class ReorderAppGroupsCommand : IRequest<Guid>
{
    public ReorderAppGroupsCommand(Guid workSurfaceId, List<Guid> reorderedAppGroupIds)
    {
        WorkSurfaceId = workSurfaceId;
        ReorderedAppGroupIds = reorderedAppGroupIds;
    }

    public Guid WorkSurfaceId { get; }
    public List<Guid> ReorderedAppGroupIds { get; }

    public class Handler : IRequestHandler<ReorderAppGroupsCommand, Guid>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task<Guid> Handle(ReorderAppGroupsCommand command, CancellationToken cancellationToken)
        {
            var workSurface = _readWriteContext.Set<WorkSurface>()
                .Include(ws => ws.AppGroups.OrderBy(appGroup => appGroup.Order))
                .FirstOrDefault(ws => ws.Id == command.WorkSurfaceId);

            if (workSurface == null)
            {
                throw new NotFoundException(nameof(WorkSurface), command.WorkSurfaceId);
            }

            var hasUnmatchedIds = workSurface.AppGroups.Select(x => x.Id).Except(command.ReorderedAppGroupIds).Any();
            
            if (hasUnmatchedIds)
            {
                throw new InvalidActionException("The provided app groups does not match the existing app groups");
            }

            workSurface.ReorderAppGroups(command.ReorderedAppGroupIds);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return workSurface.Id;
        }
    }
}
