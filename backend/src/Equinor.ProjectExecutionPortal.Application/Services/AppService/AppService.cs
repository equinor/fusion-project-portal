using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApps;
using Equinor.ProjectExecutionPortal.Application.Services.FusionAppsService;
using Fusion.Integration.Apps.Abstractions.Models;

namespace Equinor.ProjectExecutionPortal.Application.Services.AppService
{
    public class AppService(IFusionAppsService fusionAppsService) : IAppService
    {
        public async Task<OnboardedAppDto> EnrichWithFusionAppData(OnboardedAppDto onboardedApp, CancellationToken cancellationToken)
        {
            if (onboardedApp.AppKey == null)
            {
                return onboardedApp;
            }

            var fusionApp = await fusionAppsService.GetFusionApp(onboardedApp.AppKey);

            if (fusionApp != null)
            {
                onboardedApp.SupplyWithFusionData(fusionApp);
            }

            return onboardedApp;
        }

        public async Task<IList<OnboardedAppDto>> EnrichWithFusionAppData(IList<OnboardedAppDto> onboardedApps, CancellationToken cancellationToken)
        {
            var fusionApps = await fusionAppsService.GetFusionApps();

            foreach (var onboardedApp in onboardedApps)
            {
                CombineAppWithFusionAppData(onboardedApp, fusionApps);
            }

            return onboardedApps;
        }

        private static void CombineAppWithFusionAppData(OnboardedAppDto? onboardedApp, IEnumerable<App> fusionApps)
        {
            if (onboardedApp?.AppKey == null)
            {
                return;
            }

            var fusionApp = fusionApps.FirstOrDefault(fusionApp => string.Equals(fusionApp.AppKey, onboardedApp.AppKey, StringComparison.CurrentCultureIgnoreCase));

            if (fusionApp != null)
            {
                onboardedApp.SupplyWithFusionData(fusionApp);
            }
        }
    }
}
