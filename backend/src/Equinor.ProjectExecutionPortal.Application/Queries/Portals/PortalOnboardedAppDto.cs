using Equinor.ProjectExecutionPortal.Application.Infrastructure.Mappings;
using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApps;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Portals;

public class PortalOnboardedAppDto : IMapFrom<Domain.Entities.PortalApp>
{
    public required OnboardedAppDto OnboardedApp { get; set; }
    public List<Guid> ContextIds { get; set; } = [];
    public bool IsActive { get; set; }
    public bool IsGlobal { get; set; }
    public bool IsContextual { get; set; }
}
