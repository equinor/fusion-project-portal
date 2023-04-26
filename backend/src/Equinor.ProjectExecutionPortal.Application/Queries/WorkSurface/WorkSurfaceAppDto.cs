using Equinor.ProjectExecutionPortal.Application.Infrastructure.Mappings;
using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApp;

namespace Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface
{
    public class WorkSurfaceAppDto : IMapFrom<Domain.Entities.WorkSurfaceApp>
    {
        public bool IsHidden { get; set; }
        public OnboardedAppDto OnboardedApp { get; set; }
    }
}
