using Equinor.ProjectExecutionPortal.Application.Infrastructure.Mappings;
using Equinor.ProjectExecutionPortal.Application.Queries.ContextTypes;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Portals;

public class PortalDto : AuditDto, IMapFrom<Domain.Entities.Portal>
{
    public Guid Id { get; set; }
    public required string Key { get; set; }
    public required string Name { get; set; }
    public required string ShortName { get; set; }
    public required string SubText { get; set; }
    public string? Description { get; set; }
    public required string Icon { get; set; }
    public required List<ContextTypeDto> ContextTypes { get; set; }
    public required List<PortalAppDto> Apps { get; set; }
    public PortalConfigurationDto? Configuration { get; set; }
    public List<PortalAdminDto>? Admins { get; set; }
}
