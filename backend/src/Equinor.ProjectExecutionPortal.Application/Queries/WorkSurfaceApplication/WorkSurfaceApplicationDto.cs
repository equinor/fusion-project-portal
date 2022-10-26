using Equinor.ProjectExecutionPortal.Application.Infrastructure.Mappings;
using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaceAppGroup;

namespace Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaceApplication
{
    public class WorkSurfaceApplicationDto : BaseContextDto, IMapFrom<Domain.Entities.WorkSurfaceApplication>
    {
        public string AppKey { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Order { get; set; }
        public WorkSurfaceAppGroupDto AppGroup { get; set; }

        public void SupplyWithFusionData(string name, string description)
        {
            Name = name;
            Description = description;
        }
    }
}
