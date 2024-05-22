using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.Portals.SetPortalAsDefault;

public class SetPortalAsDefaultCommand : IRequest<Guid>
{
    public SetPortalAsDefaultCommand(Guid portalId)
    {
        PortalId = portalId;
    }

    public Guid PortalId { get; }

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
                .FirstOrDefaultAsync(x => x.Id == command.PortalId, cancellationToken);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Portal), command.PortalId);
            }

            if (entity.IsDefault)
            {
                return entity.Id;
            }

            // Remove isDefault from other entities
            var otherPortals = await _readWriteContext.Set<Portal>()
                .Where(x => x.Id != entity.Id && x.IsDefault)
                .ToListAsync(cancellationToken);

            foreach (var otherPortal in otherPortals)
            {
                otherPortal.UnsetAsDefault();
            }

            entity.SetAsDefault();

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}
