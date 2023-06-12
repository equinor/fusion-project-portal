using Equinor.ProjectExecutionPortal.Application.Infrastructure.Mappings;

namespace Equinor.ProjectExecutionPortal.Application.Queries.AppGroups
{
    public class AppGroupDto : IMapFrom<Domain.Entities.AppGroup>
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Order { get; set; }
        public string AccentColor { get; set; }
    }
}
