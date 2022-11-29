using Equinor.ProjectExecutionPortal.Application.Infrastructure.Mappings;
using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaceApp;

namespace Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaceAppGroup
{
    public class WorkSurfaceAppGroupDto : BaseContextDto, IMapFrom<Domain.Entities.WorkSurfaceAppGroup>
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Order { get; set; }
        public string AccentColor { get; set; }
        public List<WorkSurfaceAppDto> Apps { get; set; }
    }
}
