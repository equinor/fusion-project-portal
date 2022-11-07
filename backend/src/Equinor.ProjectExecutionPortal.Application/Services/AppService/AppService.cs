using Equinor.ProjectExecutionPortal.Application.Queries.Portal;
using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface;
using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaceApplication;
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

        public async Task<IList<WorkSurfaceApplicationDto>> EnrichAppsWithFusionAppData(IList<WorkSurfaceApplicationDto> applications, CancellationToken cancellationToken)
        {
            var fusionApps = await _fusionPortalApiService.TryGetFusionPortalApps();

            return CombineAppsWithFusionAppData(applications, fusionApps);
        }

        private static List<WorkSurfaceApplicationDto> CombineAppsWithFusionAppData(IList<WorkSurfaceApplicationDto> applicationDtos, IList<ApiFusionPortalAppInformation> fusionApps)
        {
            foreach (var applicationDto in applicationDtos)
            {
                CombineAppWithFusionAppData(applicationDto, fusionApps);
            }

            return applicationDtos.ToList();
        }

        public async Task<WorkSurfaceDto> EnrichWorkSurfaceWithFusionAppData(WorkSurfaceDto workSurface, CancellationToken cancellationToken)
        {
            var fusionApps = await _fusionPortalApiService.TryGetFusionPortalApps();

            return CombineWorkSurfaceWithFusionAppData(workSurface, fusionApps);
        }

        private static WorkSurfaceDto CombineWorkSurfaceWithFusionAppData(WorkSurfaceDto workSurfaceDto, IList<ApiFusionPortalAppInformation> fusionApps)
        {
            foreach (var applicationDto in workSurfaceDto.AppGroups.SelectMany(x => x.Applications))
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
            foreach (var applicationDto in portalDto.WorkSurfaces.SelectMany(x => x.AppGroups).SelectMany(x => x.Applications))
            {
                CombineAppWithFusionAppData(applicationDto, fusionApps);
            }

            return portalDto;
        }

        private static WorkSurfaceApplicationDto CombineAppWithFusionAppData(WorkSurfaceApplicationDto applicationDto, IEnumerable<ApiFusionPortalAppInformation> fusionApps)
        {
            var fusionApp = fusionApps.FirstOrDefault(x => string.Equals(x.Key, applicationDto.OnboardedApp.AppKey, StringComparison.CurrentCultureIgnoreCase));

            if (fusionApp != null)
            {
                applicationDto.SupplyWithFusionData(
                    fusionApp.Name,
                    fusionApp.Description);
            }

            return applicationDto;
        }
    }
}
