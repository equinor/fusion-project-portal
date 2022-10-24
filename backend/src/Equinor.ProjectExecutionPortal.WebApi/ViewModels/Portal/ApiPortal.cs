using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurface;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal
{
    public class ApiPortal
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public List<ApiWorkSurface> WorkSurfaces { get; set; }
    }
}
