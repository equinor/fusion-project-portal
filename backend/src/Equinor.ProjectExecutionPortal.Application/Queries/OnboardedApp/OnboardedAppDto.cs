using Equinor.ProjectExecutionPortal.Application.Infrastructure.Mappings;

namespace Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApp;

public class OnboardedAppDto : BaseContextDto, IMapFrom<Domain.Entities.OnboardedApp>
{
    public string AppKey { get; set; }
}
