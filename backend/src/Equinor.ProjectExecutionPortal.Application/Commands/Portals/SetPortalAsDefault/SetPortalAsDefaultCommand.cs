using Equinor.ProjectExecutionPortal.Application.Commands.Portals.UpdatePortal;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.Portals.SetPortalAsDefault;

public class SetPortalAsDefaultCommand : IRequest<Guid>
{
    public SetPortalAsDefaultCommand(Guid workSurfaceId)
    {
        WorkSurfaceId = workSurfaceId;
    }

    public Guid WorkSurfaceId { get; }

    public class Handler : IRequestHandler<SetPortalAsDefaultCommand, Guid>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task<Guid> Handle(SetPortalAsDefaultCommand command, CancellationToken cancellationToken)
        {
            var entity = await _readWriteContext.Set<Portal>()
                .FirstOrDefaultAsync(x => x.Id == command.WorkSurfaceId, cancellationToken);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Portal), command.WorkSurfaceId);
            }

            if (entity.IsDefault)
            {
                return entity.Id;
            }

            // Remove isDefault from other entities
            var otherWorkSurfaces = await _readWriteContext.Set<Portal>()
                .Where(x => x.Id != entity.Id && x.IsDefault)
                .ToListAsync(cancellationToken);

            foreach (var otherWorkSurface in otherWorkSurfaces)
            {
                otherWorkSurface.UnsetAsDefault();
            }

            entity.SetAsDefault();

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}
