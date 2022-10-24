using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceApplication;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurface
{
    public class ApiWorkSurface
    {
        public string Name { get; set; }
        public int Order { get; set; }
        public List<ApiWorkSurfaceApplication> Applications { get; set; }
    }
}
