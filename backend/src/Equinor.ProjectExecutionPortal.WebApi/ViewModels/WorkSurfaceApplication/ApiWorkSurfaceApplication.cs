using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaceApplication;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceAppGroup;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceApplication
{
    public class ApiWorkSurfaceApplication
    {
        public ApiWorkSurfaceApplication(WorkSurfaceApplicationDto workSurfaceApplicationDto)
        {
            Name = workSurfaceApplicationDto.Name;
            AppKey = workSurfaceApplicationDto.AppKey;
            Order = workSurfaceApplicationDto.Order;
        }

        public string Name { get; set; }
        public string AppKey { get; set; }
        public int Order { get; set; }
        public ApiWorkSurfaceAppGroup AppGroup { get; set; }
    }
}
