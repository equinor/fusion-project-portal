using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Equinor.ProjectExecutionPortal.Application.Commands.Portals.RemoveGlobalAppFromPortal;

public class RemoveAppFromPortalCommand : IRequest
{
    public RemoveAppFromPortalCommand(Guid portalId, string appKey)
    {
        PortalId = portalId;
        AppKey = appKey;
    }

    public Guid PortalId { get; }
    public string AppKey { get; }

    public class Handler : IRequestHandler<RemoveAppFromPortalCommand>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task Handle(RemoveAppFromPortalCommand command, CancellationToken cancellationToken)
        {
            var portalApps = await _readWriteContext.Set<PortalApp>()
                .Include(x => x.OnboardedApp)
                .Where(x => x.PortalId == command.PortalId && x.OnboardedApp.AppKey == command.AppKey)
                .ToListAsync(cancellationToken);
            
            if (portalApps.IsNullOrEmpty())
            {
                throw new NotFoundException(nameof(PortalApp), command.AppKey);
            }

            _readWriteContext.Set<PortalApp>().RemoveRange(portalApps);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

        }
    }
}
