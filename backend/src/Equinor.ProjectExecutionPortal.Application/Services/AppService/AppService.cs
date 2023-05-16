using Equinor.ProjectExecutionPortal.Application.Cache;
using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApp;
using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps.Models;

namespace Equinor.ProjectExecutionPortal.Application.Services.AppService
{
    public class AppService : IAppService
    {
        private readonly IFusionAppsCache _fusionAppsCache;

        public AppService(IFusionAppsCache fusionAppsCache)
        {
            _fusionAppsCache = fusionAppsCache;
        }

        public async Task<bool> FusionAppExist(string appKey, CancellationToken cancellationToken)
        {
            var fusionApps = await _fusionAppsCache.GetFusionApps();

            return fusionApps.Any(app => app.Key == appKey);
        }

        public async Task<IList<ApiFusionPortalAppInformation>> GetFusionApps()
        {
            var fusionApps = await _fusionAppsCache.GetFusionApps();

            return fusionApps;
        }

        public async Task<IList<OnboardedAppDto>> EnrichAppsWithFusionAppData(IList<OnboardedAppDto> onboardedApps, CancellationToken cancellationToken)
        {
            var fusionApps = await _fusionAppsCache.GetFusionApps();

            foreach (var onboardedAppDto in onboardedApps)
            {
                CombineAppWithFusionAppData(onboardedAppDto, fusionApps);
            }

            return onboardedApps;
        }

        private static void CombineAppWithFusionAppData(OnboardedAppDto? onboardedAppDto, IEnumerable<ApiFusionPortalAppInformation> fusionApps)
        {
            if (onboardedAppDto == null)
            {
                return;
            }

            var fusionApp = fusionApps.FirstOrDefault(x => string.Equals(x.Key, onboardedAppDto.AppKey, StringComparison.CurrentCultureIgnoreCase));

            if (fusionApp != null)
            {
                onboardedAppDto.SupplyWithFusionData(
                    fusionApp.Name,
                    fusionApp.Description);
            }
        }
    }
}
