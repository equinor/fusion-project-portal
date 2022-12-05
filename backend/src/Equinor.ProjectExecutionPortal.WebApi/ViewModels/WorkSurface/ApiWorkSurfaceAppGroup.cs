using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceApp;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurface
{
    public class ApiWorkSurfaceAppGroup
    {
        public ApiWorkSurfaceAppGroup()
        { }

        public ApiWorkSurfaceAppGroup(WorkSurfaceAppGroupWithAppsDto appGroupDto)
        {
            Name = appGroupDto.Name;
            Order = appGroupDto.Order;
            AccentColor = appGroupDto.AccentColor;
            Apps = appGroupDto.Apps.Select(x => new ApiWorkSurfaceApp(x)).ToList();
        }

        public string Name { get; set; }
        public int Order { get; set; }
        public string AccentColor { get; set; }
        public List<ApiWorkSurfaceApp> Apps { get; set; }
    }
}
