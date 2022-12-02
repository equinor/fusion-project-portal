using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.UpdateAppsOrder;

public class UpdateAppsOrderCommand : IRequest<Guid>
{
    public UpdateAppsOrderCommand(Guid appGroupId, List<Guid> reorderedAppIds, string? contextExternalId)
    {
        AppGroupId = appGroupId;
        ReorderedAppIds = reorderedAppIds;
        ContextExternalId = contextExternalId;
    }

    public Guid AppGroupId { get; }
    public List<Guid> ReorderedAppIds { get; }
    public string? ContextExternalId { get; }

    public class Handler : IRequestHandler<UpdateAppsOrderCommand, Guid>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task<Guid> Handle(UpdateAppsOrderCommand command, CancellationToken cancellationToken)
        {
            // We have one issue here: Updating app order on global apps. If we do this here, it may invalidate the order set by another context.
            // For now, we handle only context-specific apps

            var appGroup = _readWriteContext.Set<AppGroup>()
                .Include(ws => ws.Apps.OrderBy(app => app.Order))
                .FirstOrDefault(ws => ws.Id == command.AppGroupId);

            if (appGroup == null)
            {
                throw new NotFoundException(nameof(WorkSurface), command.AppGroupId);
            }

            if (appGroup.Apps.Count != command.ReorderedAppIds.Count)
            {
                throw new InvalidActionException("The provided apps does not match existing apps in this app group");
            }

            appGroup.ReorderApps(command.ReorderedAppIds);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return appGroup.Id;
        }
    }
}
