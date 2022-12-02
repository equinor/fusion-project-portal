using Equinor.ProjectExecutionPortal.Application.Infrastructure.Mappings;
using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApp;

namespace Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaceAppGroup
{
    public class AppGroupDto : BaseContextDto, IMapFrom<Domain.Entities.AppGroup>
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Order { get; set; }
        public string AccentColor { get; set; }
        public List<OnboardedAppDto> Apps { get; set; }
    }
}
