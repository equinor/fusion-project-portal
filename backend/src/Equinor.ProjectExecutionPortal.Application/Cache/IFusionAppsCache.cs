using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps.Models;

namespace Equinor.ProjectExecutionPortal.Application.Cache;

public interface IFusionAppsCache
{
    Task<List<FusionPortalAppInformation>> GetFusionApps();

    Task<FusionPortalAppInformation?> GetFusionApp(string appKey);
}
