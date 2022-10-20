using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps.Models;

namespace Equinor.ProjectExecutionPortal.FusionPortalApi.Apps;

public interface IFusionPortalApiService
{
    Task<IList<ApiFusionPortalAppInformation>> TryGetFusionPortalApps();

    Task<ApiFusionPortalAppInformation> TryGetFusionPortalApp(string appKey);
}
