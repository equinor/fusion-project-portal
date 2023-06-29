using Equinor.ProjectExecutionPortal.Application.Infrastructure.Mappings;
using Equinor.ProjectExecutionPortal.Application.Queries.AppGroups;

namespace Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApps;

public class OnboardedAppDto : IMapFrom<Domain.Entities.OnboardedApp>
{
    public Guid Id { get; set; }
    public string AppKey { get; set; }
    public int Order { get; set; }
    public bool IsLegacy { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public AppGroupDto AppGroup { get; set; }

    public void SupplyWithFusionData(string name, string description)
    {
        Name = name;
        Description = description;
    }
}
