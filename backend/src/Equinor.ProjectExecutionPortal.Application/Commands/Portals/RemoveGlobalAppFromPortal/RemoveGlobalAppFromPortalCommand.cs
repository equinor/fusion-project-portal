using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.Portals.RemoveGlobalAppFromPortal;

public class RemoveGlobalAppFromPortalCommand : IRequest
{
    public RemoveGlobalAppFromPortalCommand(Guid portalId, string appKey)
    {
        PortalId = portalId;
        AppKey = appKey;
    }

    public Guid PortalId { get; }
    public string AppKey { get; }

    public class Handler : IRequestHandler<RemoveGlobalAppFromPortalCommand>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task Handle(RemoveGlobalAppFromPortalCommand command, CancellationToken cancellationToken)
        {
            var portalApp = await _readWriteContext.Set<PortalApp>()
                .Include(x => x.OnboardedApp)
                .FirstOrDefaultAsync(x =>
                        x.PortalId == command.PortalId
                        && x.OnboardedContextId == null
                        && x.OnboardedApp.AppKey == command.AppKey,
                    cancellationToken);

            if (portalApp == null)
            {
                throw new NotFoundException(nameof(PortalApp), command.AppKey);
            }

            _readWriteContext.Set<PortalApp>().Remove(portalApp);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

        }
    }
}
