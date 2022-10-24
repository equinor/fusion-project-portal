using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaceAppGroup;
using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaceApplication;

namespace Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface
{
    public class WorkSurfaceDto : BaseContextDto
    {
        public string Name { get; set; }
        public string ShortName { get; set; }
        public string SubText { get; set; }
        public int Order { get; set; }
        public List<WorkSurfaceApplicationDto> Applications { get; set; }
        public List<WorkSurfaceAppGroupDto> AppGroups { get; set; }
    }
}
