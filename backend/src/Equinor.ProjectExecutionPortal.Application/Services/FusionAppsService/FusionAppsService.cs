using Equinor.ProjectExecutionPortal.Application.Cache;
using Fusion.Integration.Apps.Abstractions.Abstractions;
using Fusion.Integration.Apps.Abstractions.Models;

namespace Equinor.ProjectExecutionPortal.Application.Services.FusionAppsService;

public class FusionAppsService : IFusionAppsService
{
    private readonly IFusionAppsCache _fusionAppsCache;
    private readonly IAppsClient _fusionAppsClient;

    public FusionAppsService(IFusionAppsCache fusionAppsCache, IAppsClient fusionAppsClient)
    {
        _fusionAppsCache = fusionAppsCache;
        _fusionAppsClient = fusionAppsClient;
    }

    public async Task<bool> FusionAppExist(string appKey, CancellationToken cancellationToken)
    {
        var fusionApps = await _fusionAppsCache.GetFusionApps();

        return fusionApps != null && fusionApps.Any(app => app.AppKey == appKey);
    }

    public async Task<List<App>?> GetFusionApps()
    {
        return await _fusionAppsCache.GetFusionApps();
    }

    public async Task<App?> GetFusionApp(string appKey)
    {
        return await _fusionAppsCache.GetFusionApp(appKey);
    }

    public async Task<AppConfiguration?> GetFusionAppConfig(string appKey)
    {
        return await _fusionAppsClient.GetAppConfig(appKey, new TagNameIdentifier("latest"));
    }
}
