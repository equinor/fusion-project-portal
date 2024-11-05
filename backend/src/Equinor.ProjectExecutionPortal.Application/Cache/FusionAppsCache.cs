using Fusion.Integration.Apps.Abstractions.Abstractions;
using Fusion.Integration.Apps.Abstractions.Models;
using Microsoft.Extensions.Options;

namespace Equinor.ProjectExecutionPortal.Application.Cache;

public class FusionAppsCache : IFusionAppsCache
{
    private readonly ICacheManager _cacheManager;
    private readonly IAppsClient _fusionAppsClient;
    private readonly IOptions<CacheOptions> _cacheOptions;

    private const string FusionAppCacheKey = "FUSION_APP";

    public FusionAppsCache(ICacheManager cacheManager, IAppsClient fusionAppsClient, IOptions<CacheOptions> cacheOptions)
    {
        _cacheManager = cacheManager;
        _fusionAppsClient = fusionAppsClient;
        _cacheOptions = cacheOptions;
    }

    public async Task<List<App>> GetFusionApps()
    {
        return await _cacheManager.GetOrCreateAsync(FusionAppCacheKey,
            async () =>
            {
                var fusionApps = await _fusionAppsClient.GetAppsAsync();

                return fusionApps.ToList();
            },
            CacheDuration.Minutes, _cacheOptions.Value.FusionAppsCacheMinutes);
    }

    public async Task<App?> GetFusionApp(string appKey)
    {
        return await _cacheManager.GetOrCreateAsync(FusionAppCacheKey,
            async () => await _fusionAppsClient.GetAppAsync(appKey),
            CacheDuration.Minutes, _cacheOptions.Value.FusionAppsCacheMinutes);
    }
}
