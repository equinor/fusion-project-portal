using Equinor.ProjectExecutionPortal.Application.Infrastructure.Mappings;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Portals
{
    public class PortalConfigurationDto : IMapFrom<Domain.Entities.PortalConfiguration>
    {
        public Guid Id { get; set; }
        public string? Router { get; set; }
    }
}
