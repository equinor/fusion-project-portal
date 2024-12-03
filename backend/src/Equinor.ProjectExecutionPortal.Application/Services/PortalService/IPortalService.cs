using Equinor.ProjectExecutionPortal.Application.Queries.Portals;
using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Application.Services.PortalService;

public interface IPortalService
{
    Task<PortalOnboardedAppDto> SetAppAsActiveInPortal(PortalOnboardedAppDto app, CancellationToken cancellationToken);

    IList<PortalOnboardedAppDto> CombinePortalAppsWithOnboardedApps(Portal portal, IList<OnboardedApp> onboardedApps, CancellationToken cancellationToken);

    PortalOnboardedAppDto GetPortalOnboardedAppNotActive(OnboardedApp onboardedApp, CancellationToken cancellationToken);

    Task<PortalOnboardedAppDto> EnrichPortalAppWithContextIds(PortalOnboardedAppDto portalOnboardedAppDto, IList<Guid> contextIds, CancellationToken cancellationToken);

    Task<bool> UserIsAdmin(Guid portalId, Guid userId);
}
