using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps.Models;

namespace Equinor.ProjectExecutionPortal.FusionPortalApi.Apps;

public interface IFusionPortalApiService
{
    Task<IList<FusionPortalAppInformation>> TryGetFusionPortalApps();

    Task<FusionPortalAppInformation?> TryGetFusionPortalApp(string appKey);

    Task<dynamic?> TryGetFusionPortalAppConfig(string appKey);

    Task<dynamic?> TryGetFusionPortalAppConfigs(string appKey);

    Task<byte[]> TryGetFusionPortalAppBundle(string appKey);
}
