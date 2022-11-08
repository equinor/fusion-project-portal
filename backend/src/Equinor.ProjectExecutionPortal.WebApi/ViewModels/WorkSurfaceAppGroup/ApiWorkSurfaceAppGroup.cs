using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaceAppGroup;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceApp;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceAppGroup
{
    public class ApiWorkSurfaceAppGroup
    {
        public ApiWorkSurfaceAppGroup(WorkSurfaceAppGroupDto workSurfaceAppGroupDto)
        {
            Name = workSurfaceAppGroupDto.Name;
            Order = workSurfaceAppGroupDto.Order;
            AccentColor = workSurfaceAppGroupDto.AccentColor;
            Apps = workSurfaceAppGroupDto.Apps.Select(x => new ApiWorkSurfaceApp(x)).ToList(); 
        }

        public string Name { get; set; }
        public int Order { get; set; }
        public string AccentColor { get; set; }
        public List<ApiWorkSurfaceApp> Apps { get; set; }
    }
}
