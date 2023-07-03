using Equinor.ProjectExecutionPortal.Application.Cache;
using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApps;
using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps;
using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps.Models;

namespace Equinor.ProjectExecutionPortal.Application.Services.AppService
{
    public class AppService : IAppService
    {
        private readonly IFusionAppsCache _fusionAppsCache;
        private readonly IFusionPortalApiService _fusionPortalApiService;

        public AppService(IFusionAppsCache fusionAppsCache, IFusionPortalApiService fusionPortalApiService)
        {
            _fusionAppsCache = fusionAppsCache;
            _fusionPortalApiService = fusionPortalApiService;
        }

        public async Task<bool> FusionAppExist(string appKey, CancellationToken cancellationToken)
        {
            var fusionApps = await _fusionAppsCache.GetFusionApps();

            return fusionApps.Any(app => app.Key == appKey);
        }

        public async Task<IList<FusionPortalAppInformation>> GetFusionApps()
        {
            return await _fusionAppsCache.GetFusionApps();
        }

        public async Task<FusionPortalAppInformation?> GetFusionApp(string appKey)
        {
            return await _fusionAppsCache.GetFusionApp(appKey);
        }

        public async Task<dynamic?> GetFusionAppConfig(string appKey)
        {
            return await _fusionPortalApiService.TryGetFusionPortalAppConfig(appKey);
        }

        public async Task<dynamic?> GetFusionAppConfigs(string appKey)
        {
            return await _fusionPortalApiService.TryGetFusionPortalAppConfigs(appKey);
        }

        public async Task<OnboardedAppDto> EnrichAppWithFusionAppData(OnboardedAppDto onboardedApp, CancellationToken cancellationToken)
        {
            var fusionApp = await GetFusionApp(onboardedApp.AppKey);

            if (fusionApp != null)
            {
                onboardedApp.SupplyWithFusionData(fusionApp, FusionPortalAppInformationAmount.All);
            }

            return onboardedApp;
        }

        public async Task<IList<OnboardedAppDto>> EnrichAppsWithFusionAppData(IList<OnboardedAppDto> onboardedApps, CancellationToken cancellationToken)
        {
            var fusionApps = await GetFusionApps();

            foreach (var onboardedAppDto in onboardedApps)
            {
                CombineAppWithFusionAppData(onboardedAppDto, fusionApps);
            }

            return onboardedApps;
        }

        private static void CombineAppWithFusionAppData(OnboardedAppDto? onboardedAppDto, IEnumerable<FusionPortalAppInformation> fusionApps)
        {
            if (onboardedAppDto == null)
            {
                return;
            }

            var fusionApp = fusionApps.FirstOrDefault(x => string.Equals(x.Key, onboardedAppDto.AppKey, StringComparison.CurrentCultureIgnoreCase));

            if (fusionApp != null)
            {
                onboardedAppDto.SupplyWithFusionData(fusionApp, FusionPortalAppInformationAmount.Minimal);
            }
        }
    }
}
