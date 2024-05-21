using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaces;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp;
using ApiContextType = Equinor.ProjectExecutionPortal.WebApi.ViewModels.ContextType.ApiContextType;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.PortalApp
{
    public class ApiPortalApp
    {
        public ApiPortalApp(WorkSurfaceAppDto workSurfaceAppDto)
        {
            Key = workSurfaceAppDto.OnboardedApp.AppKey;
            ContextTypes = workSurfaceAppDto.OnboardedApp.ContextTypes.Select(x => new ApiContextType(x)).ToList();
            AppManifest = workSurfaceAppDto.OnboardedApp.AppInformation != null ? new ApiFusionPortalAppInformation(workSurfaceAppDto.OnboardedApp.AppInformation) : null;
        }

        public string Key { get; set; }
        public IList<ApiContextType> ContextTypes { get; set; }
        public ApiFusionPortalAppInformation? AppManifest { get; set; }
    }
}
