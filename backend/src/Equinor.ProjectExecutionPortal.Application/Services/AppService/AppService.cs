using Equinor.ProjectExecutionPortal.Application.Queries.Portal;
using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface;
using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps;
using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps.Models;

namespace Equinor.ProjectExecutionPortal.Application.Services.AppService
{
    public class AppService : IAppService
    {
        private readonly IFusionPortalApiService _fusionPortalApiService;

        public AppService(IFusionPortalApiService fusionPortalApiService)
        {
            _fusionPortalApiService = fusionPortalApiService;
        }

        public async Task<bool> AppExist(string appKey, CancellationToken cancellationToken)
        {
            var fusionApp = await _fusionPortalApiService.TryGetFusionPortalApp(appKey);

            return fusionApp != null;
        }

        public async Task<IList<WorkSurfaceAppDto>> EnrichAppsWithFusionAppData(IList<WorkSurfaceAppDto> apps, CancellationToken cancellationToken)
        {
            var fusionApps = await _fusionPortalApiService.TryGetFusionPortalApps();

            return CombineAppsWithFusionAppData(apps, fusionApps);
        }

        private static List<WorkSurfaceAppDto> CombineAppsWithFusionAppData(IList<WorkSurfaceAppDto> appDtos, IList<ApiFusionPortalAppInformation> fusionApps)
        {
            foreach (var applicationDto in appDtos)
            {
                CombineAppWithFusionAppData(applicationDto, fusionApps);
            }

            return appDtos.ToList();
        }

        public async Task<WorkSurfaceDto> EnrichWorkSurfaceWithFusionAppData(WorkSurfaceDto workSurface, CancellationToken cancellationToken)
        {
            var fusionApps = await _fusionPortalApiService.TryGetFusionPortalApps();

            return CombineWorkSurfaceWithFusionAppData(workSurface, fusionApps);
        }

        private static WorkSurfaceDto CombineWorkSurfaceWithFusionAppData(WorkSurfaceDto workSurfaceDto, IList<ApiFusionPortalAppInformation> fusionApps)
        {
            foreach (var applicationDto in workSurfaceDto.Apps)
            {
                CombineAppWithFusionAppData(applicationDto, fusionApps);
            }

            return workSurfaceDto;
        }

        // TEMP POC METHOD
        public async Task<PortalDto> EnrichPortalWithFusionAppData(PortalDto portal, CancellationToken cancellationToken)
        {
            var fusionApps = await _fusionPortalApiService.TryGetFusionPortalApps();

            return CombinePortalWithFusionAppData(portal, fusionApps);
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

        private static WorkSurfaceAppDto CombineAppWithFusionAppData(WorkSurfaceAppDto appDto, IEnumerable<ApiFusionPortalAppInformation> fusionApps)
        {
            var fusionApp = fusionApps.FirstOrDefault(x => string.Equals(x.Key, appDto.OnboardedApp.AppKey, StringComparison.CurrentCultureIgnoreCase));

            if (fusionApp != null)
            {
                appDto.SupplyWithFusionData(
                    fusionApp.Name,
                    fusionApp.Description);
            }

            return appDto;
        }
    }
}
