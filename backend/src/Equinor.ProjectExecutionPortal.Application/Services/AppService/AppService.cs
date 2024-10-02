using Equinor.ProjectExecutionPortal.Application.Cache;
using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApps;
using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps;
using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps.Models;
using Fusion.Integration.Apps.Abstractions.Abstractions;
using Fusion.Integration.Apps.Abstractions.Models;

namespace Equinor.ProjectExecutionPortal.Application.Services.AppService
{
    public class AppService : IAppService
    {
        private readonly IFusionAppsCache _fusionAppsCache;
        private readonly IFusionPortalApiService _fusionPortalApiService;
        private readonly IAppsClient _fusionAppsClient;

        public AppService(IFusionAppsCache fusionAppsCache, IFusionPortalApiService fusionPortalApiService,  IAppsClient fusionAppsClient)
        {
            _fusionAppsCache = fusionAppsCache;
            _fusionPortalApiService = fusionPortalApiService;
            _fusionAppsClient = fusionAppsClient;
        }

        public async Task<bool> FusionAppExist(string appKey, CancellationToken cancellationToken)
        {
            var fusionApps = await _fusionAppsCache.GetFusionApps();

            return fusionApps.Any(app => app.AppKey == appKey);
        }

        public async Task<IList<App>> GetFusionApps()
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
                CombineAppWithFusionAppData(onboardedAppDto, fusionApps, false);
            }

            return onboardedApps;
        }

        public async Task<IList<OnboardedAppDto>> EnrichAppsWithAllFusionAppData(IList<OnboardedAppDto> onboardedApps, CancellationToken cancellationToken)
        {
            var fusionApps = await GetFusionApps();

            foreach (var onboardedAppDto in onboardedApps)
            {
                CombineAppWithFusionAppData(onboardedAppDto, fusionApps, true);
            }

            return onboardedApps;
        }

        private static void CombineAppWithFusionAppData(OnboardedAppDto? onboardedAppDto, IEnumerable<App> fusionApps, bool? allFusionData)
        {
            if (onboardedAppDto == null)
            {
                return;
            }

            var fusionApp = fusionApps.FirstOrDefault(x => string.Equals(x.AppKey, onboardedAppDto.AppKey, StringComparison.CurrentCultureIgnoreCase));

            
            if (fusionApp != null)
            {
                switch (allFusionData)
                {
                    case true:
                        onboardedAppDto.SupplyWithFusionData(fusionApp, FusionPortalAppInformationAmount.All);
                        break;
                    case false:
                        onboardedAppDto.SupplyWithFusionData(fusionApp, FusionPortalAppInformationAmount.Minimal); 
                        break;
                }
            }
        }
    }
}
