using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaceAppGroup;

namespace Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface
{
    public class WorkSurfaceDto : BaseContextDto
    {
        public string Name { get; set; }
        public int Order { get; set; }
        public List<WorkSurfaceAppGroupDto> AppGroups { get; set; }
    }
}
