using Equinor.ProjectExecutionPortal.Application.Infrastructure.Mappings;

namespace Equinor.ProjectExecutionPortal.Application.Queries.AppGroup
{
    public class AppGroupDto : BaseContextDto, IMapFrom<Domain.Entities.AppGroup>
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Order { get; set; }
        public string AccentColor { get; set; }
    }
}
