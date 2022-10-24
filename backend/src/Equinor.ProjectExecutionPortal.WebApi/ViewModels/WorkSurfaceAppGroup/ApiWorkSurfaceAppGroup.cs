using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceApplication;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceAppGroup
{
    public class ApiWorkSurfaceAppGroup
    {
        public string Name { get; set; }
        public int Order { get; set; }
        public List<ApiWorkSurfaceApplication> Applications { get; set; }
    }
}
