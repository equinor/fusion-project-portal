using Equinor.ProjectExecutionPortal.Application.Cache;
using Equinor.ProjectExecutionPortal.Application.Queries.Portal;
using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface;
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

        public async Task<IList<WorkSurfaceAppDto>> EnrichAppsWithFusionAppData(IList<WorkSurfaceAppDto> apps, CancellationToken cancellationToken)
        {
            var fusionApps = await _fusionAppsCache.GetFusionApps();

            foreach (var applicationDto in apps)
            {
                CombineAppWithFusionAppData(applicationDto, fusionApps);
            }

            return apps;

            //return CombineAppsWithFusionAppData(apps, fusionApps);
        }

        public async Task<WorkSurfaceDto> EnrichWorkSurfaceWithFusionAppData(WorkSurfaceDto workSurface, CancellationToken cancellationToken)
        {
            var fusionApps = await _fusionAppsCache.GetFusionApps();


            foreach (var applicationDto in workSurface.Apps)
            {
                CombineAppWithFusionAppData(applicationDto, fusionApps);
            }

            return workSurface;

            //return CombineWorkSurfaceWithFusionAppData(workSurface, fusionApps);
        }

        // TEMP POC METHOD
        public async Task<PortalDto> EnrichPortalWithFusionAppData(PortalDto portal, CancellationToken cancellationToken)
        {
            var fusionApps = await _fusionAppsCache.GetFusionApps();


            foreach (var applicationDto in portal.WorkSurfaces.SelectMany(x => x.Apps))
            {
                CombineAppWithFusionAppData(applicationDto, fusionApps);
            }

            return portal;

            //return CombinePortalWithFusionAppData(portal, fusionApps);
        }

        private static WorkSurfaceDto CombineWorkSurfaceWithFusionAppData(WorkSurfaceDto workSurfaceDto, IList<ApiFusionPortalAppInformation> fusionApps)
        {
            foreach (var applicationDto in workSurfaceDto.Apps)
            {
                CombineAppWithFusionAppData(applicationDto, fusionApps);
            }

            return workSurfaceDto;
        }

        private static List<WorkSurfaceAppDto> CombineAppsWithFusionAppData(IList<WorkSurfaceAppDto> appDtos, IList<ApiFusionPortalAppInformation> fusionApps)
        {
            foreach (var applicationDto in appDtos)
            {
                CombineAppWithFusionAppData(applicationDto, fusionApps);
            }

            return appDtos.ToList();
        }

        // TEMP POC METHOD
        private static PortalDto CombinePortalWithFusionAppData(PortalDto portalDto, IList<ApiFusionPortalAppInformation> fusionApps)
        {
            foreach (var applicationDto in portalDto.WorkSurfaces.SelectMany(x => x.Apps))
            {
                CombineAppWithFusionAppData(applicationDto, fusionApps);
            }

            return portalDto;
        }

        private static void CombineAppWithFusionAppData(WorkSurfaceAppDto appDto, IEnumerable<ApiFusionPortalAppInformation> fusionApps)
        {
            var fusionApp = fusionApps.FirstOrDefault(x => string.Equals(x.Key, appDto.OnboardedApp.AppKey, StringComparison.CurrentCultureIgnoreCase));

            if (fusionApp != null)
            {
                appDto.SupplyWithFusionData(
                    fusionApp.Name,
                    fusionApp.Description);
            }
        }
    }
}
