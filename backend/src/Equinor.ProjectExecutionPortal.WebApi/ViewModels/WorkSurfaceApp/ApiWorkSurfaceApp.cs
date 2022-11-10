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

        public string AppKey { get; }
        public string Name { get; }
        public string Description { get; }
        public int Order { get; }
        public ApiWorkSurfaceAppGroup? AppGroup { get; }
    }
}
