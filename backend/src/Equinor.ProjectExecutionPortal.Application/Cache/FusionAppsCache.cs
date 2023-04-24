using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps;
using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps.Models;

namespace Equinor.ProjectExecutionPortal.Application.Cache;

public class FusionAppsCache : IFusionAppsCache
{
    private readonly ICacheManager _cacheManager;
    private readonly IFusionPortalApiService _fusionPortalApiService;

    public FusionAppsCache(ICacheManager cacheManager, IFusionPortalApiService fusionPortalApiService)
    {
        _cacheManager = cacheManager;
        _fusionPortalApiService = fusionPortalApiService;
    }

    public async Task<List<ApiFusionPortalAppInformation>> GetFusionApps()
    {
        return await _cacheManager.GetOrCreateAsync("FUSION_APP",
            async () =>
            {
                var fusionApps = await _fusionPortalApiService.TryGetFusionPortalApps();

                return fusionApps.ToList();
            },
            CacheDuration.Minutes,
            60);
    }
}
