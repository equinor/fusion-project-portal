using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.Portals.RemovePortal
{
    public class RemovePortalCommand : IRequest
    {
        public RemovePortalCommand(Guid id)
        {
            Id = id;
        }

        public Guid Id { get; }

        public class Handler : IRequestHandler<RemovePortalCommand>
        {
            private readonly IReadWriteContext _context;

            public Handler(IReadWriteContext context)
            {
                _context = context;
            }

            public async Task Handle(RemovePortalCommand command, CancellationToken cancellationToken)
            {
                var entity = await _context.Set<Portal>()
                    .FirstOrDefaultAsync(portal => portal.Id == command.Id, cancellationToken);

                if (entity == null)
                {
                    throw new NotFoundException(nameof(Portal), command.Id);
                }

                _context.Set<Portal>().Remove(entity);

                await _context.SaveChangesAsync(cancellationToken);

            }
        }
    }
}
