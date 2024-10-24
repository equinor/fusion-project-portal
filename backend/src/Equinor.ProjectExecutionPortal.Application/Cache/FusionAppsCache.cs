using Fusion.Integration.Apps.Abstractions.Abstractions;
using Fusion.Integration.Apps.Abstractions.Models;

namespace Equinor.ProjectExecutionPortal.Application.Cache;

public class FusionAppsCache : IFusionAppsCache
{
    private readonly ICacheManager _cacheManager;
    private readonly IAppsClient _fusionAppsClient;

    // TODO: Move cache duration to app settings
    public FusionAppsCache(ICacheManager cacheManager, IAppsClient fusionAppsClient)
    {
        _cacheManager = cacheManager;
        _fusionAppsClient = fusionAppsClient;
    }

    public async Task<List<App>> GetFusionApps()
    {
        return await _cacheManager.GetOrCreateAsync("FUSION_APP",
            async () =>
            {
                var fusionApps = await _fusionAppsClient.GetAppsAsync();

                return fusionApps.ToList();
            },
            CacheDuration.Minutes,
            60);
    }

    public async Task<App?> GetFusionApp(string appKey)
    {
        return await _cacheManager.GetOrCreateAsync("FUSION_APP",
            async () => await _fusionAppsClient.GetAppAsync(appKey),
            CacheDuration.Minutes,
            60);
    }
}
