using Equinor.ProjectExecutionPortal.Application.Queries.Portals;
using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Application.Services.PortalService;

public interface IPortalService
{
    Task<PortalOnboardedAppDto> SetAppAsActiveInPortal(PortalOnboardedAppDto app, CancellationToken cancellationToken);

    List<PortalOnboardedAppDto> CombinePortalAppsWithOnboardedApps(Portal portal, List<OnboardedApp> onboardedApps, CancellationToken cancellationToken);

    PortalOnboardedAppDto GetPortalOnboardedAppNotActive(OnboardedApp onboardedApp, CancellationToken cancellationToken);

    Task<PortalOnboardedAppDto> EnrichPortalAppWithContextIds(PortalOnboardedAppDto portalOnboardedAppDto, List<Guid> contextIds, CancellationToken cancellationToken);

    Task<bool> UserIsAdmin(Guid portalId, Guid userOId);
}
