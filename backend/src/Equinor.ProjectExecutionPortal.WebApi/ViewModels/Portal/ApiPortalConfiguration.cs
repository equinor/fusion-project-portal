using Equinor.ProjectExecutionPortal.Application.Queries.Portals;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal
{
    public class ApiPortalConfiguration
    {
        public ApiPortalConfiguration() { }

        public ApiPortalConfiguration(PortalConfigurationDto portalConfigurationDto)
        {
            Router = portalConfigurationDto.Router;
            Extension = portalConfigurationDto.Extension;
            Environment = portalConfigurationDto.Environment;
        }

        public string? Router { get; set; }
        public string? Extension { get; set; }
        public string? Environment { get; set; }
    }
}
