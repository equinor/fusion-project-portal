using Equinor.ProjectExecutionPortal.Application.Queries.Portals;
using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Application.Services.PortalService;

public interface IPortalService
{
    PortalOnboardedAppDto SetAppAsActiveInPortal(PortalOnboardedAppDto app);

    List<PortalOnboardedAppDto> CombinePortalAppsWithOnboardedApps(Portal portal, List<OnboardedApp> onboardedApps, CancellationToken cancellationToken);

    PortalOnboardedAppDto GetPortalOnboardedAppNotActive(OnboardedApp onboardedApp, CancellationToken cancellationToken);

    PortalOnboardedAppDto EnrichPortalAppWithContextIds(PortalOnboardedAppDto portalOnboardedAppDto, List<Guid> contextIds);

    Task<bool> UserIsAdmin(Guid portalId, Guid userOId);
}
