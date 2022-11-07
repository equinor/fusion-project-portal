using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaceApp;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceAppGroup;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceApp
{
    public class ApiWorkSurfaceApp
    {
        public ApiWorkSurfaceApp(WorkSurfaceAppDto workSurfaceAppDto)
        {
            AppKey = workSurfaceAppDto.OnboardedApp.AppKey;
            Name = workSurfaceAppDto.Name;
            Description = workSurfaceAppDto.Description;
            Order = workSurfaceAppDto.Order;
        }

        public string AppKey { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Order { get; set; }
        public ApiWorkSurfaceAppGroup? AppGroup { get; set; }
    }
}
