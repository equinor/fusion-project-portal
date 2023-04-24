using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps.Models;

namespace Equinor.ProjectExecutionPortal.Application.Cache;

public interface IFusionAppsCache
{
    Task<List<ApiFusionPortalAppInformation>> GetFusionApps();
}
