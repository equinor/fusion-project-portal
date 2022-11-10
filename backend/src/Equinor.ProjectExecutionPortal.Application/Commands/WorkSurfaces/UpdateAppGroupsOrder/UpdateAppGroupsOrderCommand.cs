﻿using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.UpdateAppGroupsOrder;

public class UpdateAppGroupsOrderCommand : IRequest<Guid>
{
    public UpdateAppGroupsOrderCommand(Guid workSurfaceId, List<Guid> reorderedAppGroupIds)
    {
        WorkSurfaceId = workSurfaceId;
        ReorderedAppGroupIds = reorderedAppGroupIds;
    }

    public Guid WorkSurfaceId { get; }
    public List<Guid> ReorderedAppGroupIds { get; }

    public class Handler : IRequestHandler<UpdateAppGroupsOrderCommand, Guid>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task<Guid> Handle(UpdateAppGroupsOrderCommand command, CancellationToken cancellationToken)
        {
            var workSurface = _readWriteContext.Set<WorkSurface>()
                .Include(ws => ws.AppGroups.OrderBy(appGroup => appGroup.Order))
                .FirstOrDefault(ws => ws.Id == command.WorkSurfaceId);

            if (workSurface == null)
            {
                throw new NotFoundException(nameof(WorkSurface), command.WorkSurfaceId);
            }

            if (workSurface.AppGroups.Count != command.ReorderedAppGroupIds.Count)
            {
                throw new InvalidActionException("The provided app groups does not match existing app groups");
            }

            workSurface.ReorderAppGroups(command.ReorderedAppGroupIds);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return workSurface.Id;
        }
    }
}
