using Equinor.ProjectExecutionPortal.Application.Infrastructure.Mappings;
using Equinor.ProjectExecutionPortal.Application.Queries.AppGroup;
using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApp;

namespace Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface
{
    public class WorkSurfaceAppDto : BaseContextDto, IMapFrom<Domain.Entities.WorkSurfaceApp>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Order { get; set; }
        public AppGroupDto? AppGroup { get; set; }
        public OnboardedAppDto OnboardedApp { get; set; }

        public void SupplyWithFusionData(string name, string description)
        {
            Name = name;
            Description = description;
        }
    }
}
