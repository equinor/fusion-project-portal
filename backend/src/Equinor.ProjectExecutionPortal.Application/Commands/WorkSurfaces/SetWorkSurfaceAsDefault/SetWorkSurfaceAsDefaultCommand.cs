using Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.UpdateWorkSurface;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.SetWorkSurfaceAsDefault;

public class SetWorkSurfaceAsDefaultCommand : IRequest<Guid>
{
    public SetWorkSurfaceAsDefaultCommand(Guid id)
    {
        Id = id;
    }

    public Guid Id { get; }

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
                .FirstOrDefaultAsync(x => x.Id == command.Id, cancellationToken);

            if (entity == null)
            {
                throw new NotFoundException(nameof(WorkSurface), command.Id);
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
