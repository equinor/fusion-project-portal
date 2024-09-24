using Equinor.ProjectExecutionPortal.Application.Queries.Portals;
using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Application.Services.PortalService
{
    public interface IPortalService
    {
        Task<IList<PortalOnboardedAppDto>> SetAppsAsActiveInPortal(IList<PortalOnboardedAppDto> apps, CancellationToken cancellationToken);
        Task<PortalOnboardedAppDto> SetAppAsActiveInPortal(PortalOnboardedAppDto app, CancellationToken cancellationToken);
        Task<IList<PortalOnboardedAppDto>> CombinePortalAppsWithOnboardedApps(Portal portal, IList<OnboardedApp> onboardedApps, CancellationToken cancellationToken);
        Task<PortalOnboardedAppDto> GetPortalOnboardedAppNotActive(OnboardedApp onboardedApp, CancellationToken cancellationToken);
        Task<PortalOnboardedAppDto> EnrichPortalAppWithContextIds(PortalOnboardedAppDto portalOnboardedAppDto, IList<Guid> contextIds, CancellationToken cancellationToken);
    }
}
