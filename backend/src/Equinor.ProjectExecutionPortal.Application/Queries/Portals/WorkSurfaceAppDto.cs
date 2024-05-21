using Equinor.ProjectExecutionPortal.Application.Infrastructure.Mappings;
using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApps;

namespace Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaces
{
    public class WorkSurfaceAppDto : IMapFrom<Domain.Entities.PortalApp>
    {
        public bool IsHidden { get; set; }
        public OnboardedAppDto OnboardedApp { get; set; }
    }
}
