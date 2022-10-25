using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaceApplication;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceAppGroup;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceApplication
{
    public class ApiWorkSurfaceApplication
    {
        public ApiWorkSurfaceApplication(WorkSurfaceApplicationDto workSurfaceApplicationDto)
        {
            AppKey = workSurfaceApplicationDto.AppKey;
            Name = workSurfaceApplicationDto.Name;
            Description = workSurfaceApplicationDto.Description;
            Order = workSurfaceApplicationDto.Order;
        }

        public string AppKey { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Order { get; set; }
        public ApiWorkSurfaceAppGroup AppGroup { get; set; }
    }
}
