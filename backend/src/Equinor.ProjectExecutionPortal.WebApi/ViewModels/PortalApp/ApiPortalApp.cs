using Equinor.ProjectExecutionPortal.Application.Queries.Portals;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.ContextType;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.FusionApp;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.PortalApp
{
    public class ApiPortalApp
    {
        public ApiPortalApp()
        {

        }
        public ApiPortalApp(PortalAppDto portalAppDto)
        {
            Key = portalAppDto.OnboardedApp.AppKey;
            ContextTypes = portalAppDto.OnboardedApp.ContextTypes.Select(x => new ApiContextType(x)).ToList();
            AppManifest = portalAppDto.OnboardedApp.AppInformation != null ? new ApiFusionApp(portalAppDto.OnboardedApp.AppInformation) : null;
        }

        public string Key { get; set; }
        public IList<ApiContextType> ContextTypes { get; set; }
        public ApiFusionApp? AppManifest { get; set; }
    }
}
