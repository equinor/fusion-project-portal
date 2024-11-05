using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApps;
using Equinor.ProjectExecutionPortal.Application.Services.FusionAppsService;
using Fusion.Integration.Apps.Abstractions.Models;

namespace Equinor.ProjectExecutionPortal.Application.Services.AppService;

public class AppService : IAppService
{
    private readonly IFusionAppsService _fusionAppsService;

    public AppService(IFusionAppsService fusionAppsService)
    {
        _fusionAppsService = fusionAppsService;
    }

    public async Task<OnboardedAppDto> EnrichWithFusionAppData(OnboardedAppDto onboardedApp, CancellationToken cancellationToken)
    {
        var fusionApp = await _fusionAppsService.GetFusionApp(onboardedApp.AppKey);

        if (fusionApp != null)
        {
            onboardedApp.SupplyWithFusionData(fusionApp);
        }

        return onboardedApp;
    }

    public async Task<IList<OnboardedAppDto>> EnrichWithFusionAppData(IList<OnboardedAppDto> onboardedApps, CancellationToken cancellationToken)
    {
        var fusionApps = await _fusionAppsService.GetFusionApps();

        foreach (var onboardedApp in onboardedApps)
        {
            CombineAppWithFusionAppData(onboardedApp, fusionApps);
        }

        return onboardedApps;
    }

    private static void CombineAppWithFusionAppData(OnboardedAppDto onboardedApp, IEnumerable<App> fusionApps)
    {
        var fusionApp = fusionApps.FirstOrDefault(fusionApp => string.Equals(fusionApp.AppKey, onboardedApp.AppKey, StringComparison.CurrentCultureIgnoreCase));

        if (fusionApp != null)
        {
            onboardedApp.SupplyWithFusionData(fusionApp);
        }
    }
}
