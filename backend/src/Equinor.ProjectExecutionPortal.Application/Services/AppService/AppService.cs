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

        public async Task<IList<WorkSurfaceApplicationDto>> EnrichWithFusionAppData(IList<WorkSurfaceApplicationDto> applications, CancellationToken cancellationToken)
        {
            var fusionApps = await _fusionPortalApiService.TryGetFusionPortalApps();

            return CombineWithFusionAppData(applications, fusionApps);
        }

        private static List<WorkSurfaceApplicationDto> CombineWithFusionAppData(IList<WorkSurfaceApplicationDto> applicationDtos, IList<ApiFusionPortalAppInformation> fusionApps)
        {
            foreach (var applicationDto in applicationDtos)
            {
                var fusionApp = fusionApps.FirstOrDefault(x => string.Equals(x.Key, applicationDto.AppKey, StringComparison.CurrentCultureIgnoreCase));

                if (fusionApp != null)
                {
                    applicationDto.SupplyWithFusionData(
                        fusionApp.Name,
                        fusionApp.Description);
                }
            }

            return applicationDtos.ToList();
        }
    }
}
