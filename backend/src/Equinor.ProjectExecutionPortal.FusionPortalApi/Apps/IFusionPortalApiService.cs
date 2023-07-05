using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps.Models;

namespace Equinor.ProjectExecutionPortal.FusionPortalApi.Apps;

public interface IFusionPortalApiService
{
    Task<IList<FusionPortalAppInformation>> TryGetFusionPortalApps();

    Task<FusionPortalAppInformation?> TryGetFusionPortalApp(string appKey);

    Task<FusionAppEnvironmentConfig?> TryGetFusionPortalAppConfig(string appKey);

    Task<byte[]> TryGetFusionPortalAppBundle(string appKey);
}
