using Fusion.Integration.Apps.Abstractions.Models;

namespace Equinor.ProjectExecutionPortal.Application.Cache;

public interface IFusionAppsCache
{
    Task<List<App>> GetFusionApps();

    Task<App?> GetFusionApp(string appKey);
}
