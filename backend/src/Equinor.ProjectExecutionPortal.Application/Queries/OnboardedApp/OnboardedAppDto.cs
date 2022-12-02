using Equinor.ProjectExecutionPortal.Application.Infrastructure.Mappings;
using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaceAppGroup;

namespace Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApp;

public class OnboardedAppDto : BaseContextDto, IMapFrom<Domain.Entities.OnboardedApp>
{
    public string AppKey { get; set; }
    public AppGroupDto AppGroup { get; set; }
}
