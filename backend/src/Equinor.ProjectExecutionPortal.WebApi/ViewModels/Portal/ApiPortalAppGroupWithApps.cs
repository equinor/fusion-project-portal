using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaces;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.PortalApp;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal
{
    public class ApiPortalAppGroupWithApps
    {
        public ApiPortalAppGroupWithApps(WorkSurfaceAppGroupWithAppsDto appGroupDto)
        {
            Name = appGroupDto.Name;
            Order = appGroupDto.Order;
            AccentColor = appGroupDto.AccentColor;
            Apps = appGroupDto.Apps.Select(x => new ApiPortalApp(x)).ToList();
        }

        public string Name { get; set; }
        public int Order { get; set; }
        public string AccentColor { get; set; }
        public List<ApiPortalApp> Apps { get; set; }
    }
}
