using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceAppGroup;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceApplication
{
    public class ApiWorkSurfaceApplication
    {
        public string Name { get; set; }
        public int Order { get; set; }
        public ApiWorkSurfaceAppGroup AppGroup { get; set; }
    }
}
