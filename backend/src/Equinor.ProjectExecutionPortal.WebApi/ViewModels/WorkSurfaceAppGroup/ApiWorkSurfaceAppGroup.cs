using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaceAppGroup;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceApplication;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceAppGroup
{
    public class ApiWorkSurfaceAppGroup
    {
        public ApiWorkSurfaceAppGroup(WorkSurfaceAppGroupDto workSurfaceAppGroupDto)
        {
            Name = workSurfaceAppGroupDto.Name;
            Order = workSurfaceAppGroupDto.Order;
            Applications = workSurfaceAppGroupDto.Applications.OrderBy(x => x.Order).Select(x => new ApiWorkSurfaceApplication(x)).ToList();
        }
        public string Name { get; set; }
        public int Order { get; set; }
        public List<ApiWorkSurfaceApplication> Applications { get; set; }
    }
}
