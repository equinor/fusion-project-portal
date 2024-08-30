using Equinor.ProjectExecutionPortal.Application.Queries.Portals;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal
{
    public class ApiPortalConfiguration
    {
        public ApiPortalConfiguration() { }

        public ApiPortalConfiguration(PortalConfigurationDto portalConfigurationDto)
        {
            Router = portalConfigurationDto.Router;
        }

        public string? Router { get; set; }
    }
}
