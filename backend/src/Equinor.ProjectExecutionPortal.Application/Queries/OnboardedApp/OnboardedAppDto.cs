using Equinor.ProjectExecutionPortal.Application.Infrastructure.Mappings;
using Equinor.ProjectExecutionPortal.Application.Queries.AppGroup;

namespace Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApp;

public class OnboardedAppDto : BaseContextDto, IMapFrom<Domain.Entities.OnboardedApp>
{
    public Guid Id { get; set; }
    public string AppKey { get; set; }
    public int Order { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public AppGroupDto AppGroup { get; set; }

    public void SupplyWithFusionData(string name, string description)
    {
        Name = name;
        Description = description;
    }
}
