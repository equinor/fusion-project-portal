using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.Portals.UpdatePortalConfiguration;

public class UpdatePortalConfigurationCommand : IRequest<Guid>
{
    public UpdatePortalConfigurationCommand(Guid portalId, string? router, string? extension, string? environment)
    {
        PortalId = portalId;
        Router = router;
        Extension = extension;
        Environment = environment;
    }

    public Guid PortalId { get; }
    public string? Router { get; }
    public string? Extension { get; }
    public string? Environment { get; }

    public class Handler : IRequestHandler<UpdatePortalConfigurationCommand, Guid>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task<Guid> Handle(UpdatePortalConfigurationCommand command, CancellationToken cancellationToken)
        {
            var entity = await _readWriteContext.Set<Portal>()
                .Include(portal => portal.Configuration)
                .FirstOrDefaultAsync(portal => portal.Id == command.PortalId, cancellationToken);

            if (entity == null)
            {
                throw new NotFoundException(nameof(PortalConfiguration), command.PortalId);
            }

            entity.Configuration.Update(command.Router, command.Extension, command.Environment);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}
