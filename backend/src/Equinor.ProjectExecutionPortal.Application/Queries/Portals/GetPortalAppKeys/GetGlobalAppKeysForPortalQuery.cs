using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Portals.GetPortalAppKeys;

public class GetGlobalAppKeysForPortalQuery : QueryBase<List<string>>
{
    public GetGlobalAppKeysForPortalQuery(Guid portalId)
    {
        PortalId = portalId;
    }

    public Guid PortalId { get; }

    public class Handler : IRequestHandler<GetGlobalAppKeysForPortalQuery, List<string>>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task<List<string>> Handle(GetGlobalAppKeysForPortalQuery request, CancellationToken cancellationToken)
        {
            var portalWithGlobalApps = await _readWriteContext.Set<Portal>()
                .AsNoTracking()
                .Include(portal => portal.Apps
                    .Where(app => app.OnboardedContext == null))
                    .ThenInclude(portalApp => portalApp.OnboardedApp)
                    .ThenInclude(app => app.ContextTypes)
            .FirstOrDefaultAsync(x => x.Id == request.PortalId, cancellationToken);

            if (portalWithGlobalApps == null)
            {
                throw new NotFoundException(nameof(Portal), request.PortalId);
            }

            var globalPortalAppKeys = portalWithGlobalApps.Apps
                .Select(app => app.OnboardedApp.AppKey)
                .Distinct()
                .ToList();

            return globalPortalAppKeys;
        }
    }
}
