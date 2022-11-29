using Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.UpdateWorkSurface;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.SetWorkSurfaceAsDefault;

public class SetWorkSurfaceAsDefaultCommand : IRequest<Guid>
{
    public SetWorkSurfaceAsDefaultCommand(Guid workSurfaceId)
    {
        WorkSurfaceId = workSurfaceId;
    }

    public Guid WorkSurfaceId { get; }

    public class Handler : IRequestHandler<SetWorkSurfaceAsDefaultCommand, Guid>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task<Guid> Handle(SetWorkSurfaceAsDefaultCommand command, CancellationToken cancellationToken)
        {
            var entity = await _readWriteContext.Set<WorkSurface>()
                .FirstOrDefaultAsync(x => x.Id == command.WorkSurfaceId, cancellationToken);

            if (entity == null)
            {
                throw new NotFoundException(nameof(WorkSurface), command.WorkSurfaceId);
            }

            if (entity.IsDefault)
            {
                return entity.Id;
            }

            // Remove isDefault from other entities
            var otherWorkSurfaces = await _readWriteContext.Set<WorkSurface>()
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
