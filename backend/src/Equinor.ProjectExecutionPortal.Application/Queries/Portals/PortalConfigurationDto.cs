using Equinor.ProjectExecutionPortal.Application.Infrastructure.Mappings;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Portals;

public class PortalConfigurationDto : AuditDto, IMapFrom<Domain.Entities.PortalConfiguration>
{
    public string? Router { get; set; }
    public string? Extension { get; set; }
    public string? Environment { get; set; }
}
