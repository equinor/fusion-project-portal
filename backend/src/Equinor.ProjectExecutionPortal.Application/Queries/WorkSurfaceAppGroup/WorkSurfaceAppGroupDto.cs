using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaceApplication;

namespace Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaceAppGroup
{
    public class WorkSurfaceAppGroupDto : BaseContextDto
    {
        public string Name { get; set; }
        public int Order { get; set; }
        public List<WorkSurfaceApplicationDto> Applications { get; set; }
    }
}
