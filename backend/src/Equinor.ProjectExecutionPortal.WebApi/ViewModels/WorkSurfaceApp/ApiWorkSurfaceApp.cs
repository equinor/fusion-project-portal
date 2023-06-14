using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaces;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceApp
{
    public class ApiWorkSurfaceApp
    {
        public ApiWorkSurfaceApp(WorkSurfaceAppDto workSurfaceAppDto)
        {
            AppKey = workSurfaceAppDto.OnboardedApp.AppKey;
            Name = workSurfaceAppDto.OnboardedApp.Name;
            Description = workSurfaceAppDto.OnboardedApp.Description;
            Order = workSurfaceAppDto.OnboardedApp.Order;
        }

        public string AppKey { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Order { get; set; }
    }
}
