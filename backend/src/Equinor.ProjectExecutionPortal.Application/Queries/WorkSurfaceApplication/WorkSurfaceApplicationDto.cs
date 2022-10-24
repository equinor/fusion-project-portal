using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaceAppGroup;

namespace Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaceApplication
{
    public class WorkSurfaceApplicationDto : BaseContextDto
    {
        public string Name { get; set; }
        public string AppKey { get; set; }
        public int Order { get; set; }
        public WorkSurfaceAppGroupDto AppGroup { get; set; }
    }
}
