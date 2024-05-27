using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.OnboardedApps.ReorderOnboardedApps;

public class ReorderOnboardedAppsCommand : IRequest<Guid>
{
    public ReorderOnboardedAppsCommand(Guid appGroupId, List<Guid> reorderedAppIds)
    {
        AppGroupId = appGroupId;
        ReorderedAppIds = reorderedAppIds;
    }

    public Guid AppGroupId { get; }
    public List<Guid> ReorderedAppIds { get; }

    public class Handler : IRequestHandler<ReorderOnboardedAppsCommand, Guid>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task<Guid> Handle(ReorderOnboardedAppsCommand command, CancellationToken cancellationToken)
        {
            var appGroup = _readWriteContext.Set<AppGroup>()
                .Include(ws => ws.Apps.OrderBy(app => app.Order))
                .FirstOrDefault(ws => ws.Id == command.AppGroupId);

            if (appGroup == null)
            {
                throw new NotFoundException(nameof(Portal), command.AppGroupId);
            }

            var hasUnmatchedIds = appGroup.Apps.Select(x => x.Id).Except(command.ReorderedAppIds).Any();

            if (hasUnmatchedIds || appGroup.Apps.Count != command.ReorderedAppIds.Count)
            {
                throw new InvalidActionException("The provided apps does not match existing apps in this app group");
            }

            appGroup.ReorderApps(command.ReorderedAppIds);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return appGroup.Id;
        }
    }
}
