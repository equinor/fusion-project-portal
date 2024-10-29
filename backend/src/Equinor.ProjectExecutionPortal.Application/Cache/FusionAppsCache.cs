using Fusion.Integration.Apps.Abstractions.Abstractions;
using Fusion.Integration.Apps.Abstractions.Models;

namespace Equinor.ProjectExecutionPortal.Application.Cache;

public class FusionAppsCache(ICacheManager cacheManager, IAppsClient fusionAppsClient) : IFusionAppsCache
{
    // TODO: Move cache duration to app settings

    public async Task<List<App>> GetFusionApps()
    {
        return await cacheManager.GetOrCreateAsync("FUSION_APP",
            async () =>
            {
                var fusionApps = await fusionAppsClient.GetAppsAsync();

                return fusionApps.ToList();
            },
            CacheDuration.Minutes,
            60);
    }

    public async Task<App?> GetFusionApp(string appKey)
    {
        return await cacheManager.GetOrCreateAsync("FUSION_APP",
            async () => await fusionAppsClient.GetAppAsync(appKey),
            CacheDuration.Minutes,
            60);
    }
}
