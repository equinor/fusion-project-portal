using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.Application.Services.PortalService;
using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Portals.GetPortalOnboardedApps;

public class GetPortalOnboardedAppsQuery(Guid portalId) : QueryBase<List<PortalOnboardedAppDto>>
{
    public Guid PortalId { get; } = portalId;

    public class Handler : IRequestHandler<GetPortalOnboardedAppsQuery, List<PortalOnboardedAppDto>>
    {
        private readonly IReadWriteContext _readWriteContext;
        private readonly IAppService _appService;
        private readonly IPortalService _portalService;

        public Handler(IReadWriteContext readWriteContext, IAppService appService, IPortalService portalService)
        {
            _readWriteContext = readWriteContext;
            _appService = appService;
            _portalService = portalService;
        }

        public async Task<List<PortalOnboardedAppDto>> Handle(GetPortalOnboardedAppsQuery request, CancellationToken cancellationToken)
        {
            var portal = await _readWriteContext.Set<Portal>()
                .AsNoTracking()
                .Include(portal => portal.ContextTypes)
                .Include(portal => portal.Apps)
                .ThenInclude(portalApp => portalApp.OnboardedApp)
                .ThenInclude(app => app.ContextTypes)
                .FirstOrDefaultAsync(x => x.Id == request.PortalId, cancellationToken);

            if (portal == null)
            {
                return [];
            }

            var onboardedApps = await _readWriteContext.Set<OnboardedApp>()
                .AsNoTracking()
                .Include(onboardedApp => onboardedApp.ContextTypes)
                .ToListAsync(cancellationToken);

            var portalOnboardedAppsDto = _portalService.CombinePortalAppsWithOnboardedApps(portal, onboardedApps, cancellationToken);

            await _appService.EnrichWithFusionAppData(portalOnboardedAppsDto.Select(portalAppDto => portalAppDto.OnboardedApp).ToList(), cancellationToken);

            return portalOnboardedAppsDto;
        }
    }
}
