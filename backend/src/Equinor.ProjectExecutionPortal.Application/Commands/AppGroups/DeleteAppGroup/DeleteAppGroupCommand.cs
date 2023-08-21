using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.AppGroups.DeleteAppGroup;

public class DeleteAppGroupCommand : IRequest<Guid>
{
    public DeleteAppGroupCommand(Guid appGroupId)
    {
        AppGroupId = appGroupId;
    }

    public Guid AppGroupId { get; set; }

    public class Handler : IRequestHandler<DeleteAppGroupCommand, Guid>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task<Guid> Handle(DeleteAppGroupCommand command, CancellationToken cancellationToken)
        {
            var appGroup = await _readWriteContext.Set<AppGroup>()
                .Include(x => x.Apps)
                .FirstOrDefaultAsync(x => x.Id == command.AppGroupId, cancellationToken);

            if (appGroup == null)
            {
                throw new NotFoundException(nameof(appGroup));
            }

            if (appGroup.Apps.Any())
            {
                throw new InvalidActionException("Can't delete app group because apps exists in it.");
            }

            _readWriteContext.Set<AppGroup>().Remove(appGroup);

            // Perform re-ordering of remaining items
            var appGroups = await _readWriteContext.Set<AppGroup>()
                .OrderBy(x => x.Order)
                .ToListAsync(cancellationToken);

            AppGroup.RefreshOrder(appGroups);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return appGroup.Id;
        }
    }
}
