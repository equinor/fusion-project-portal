using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.ReorderAppGroups;

public class ReorderAppGroupsCommand : IRequest<Unit>
{
    public ReorderAppGroupsCommand(List<Guid> reorderedAppGroupIds)
    {
        ReorderedAppGroupIds = reorderedAppGroupIds;
    }

    public List<Guid> ReorderedAppGroupIds { get; }

    public class Handler : IRequestHandler<ReorderAppGroupsCommand, Unit>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task<Unit> Handle(ReorderAppGroupsCommand command, CancellationToken cancellationToken)
        {
            var appGroups = await _readWriteContext.Set<AppGroup>()
                .ToListAsync(cancellationToken);

            var hasUnmatchedIds = appGroups.Select(x => x.Id).Except(command.ReorderedAppGroupIds).Any();

            if (hasUnmatchedIds)
            {
                throw new InvalidActionException("The provided app groups does not match the existing app groups");
            }

            foreach (var (orderedAppGroupId, index) in command.ReorderedAppGroupIds.Select((value, i) => (value, i)))
            {
                var currentAppGroup = appGroups.Single(x => x.Id == orderedAppGroupId);
                currentAppGroup.UpdateOrder(index);
            }

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
