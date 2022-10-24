using Equinor.ProjectExecutionPortal.Application.Queries.Portal;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurface;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal
{
    public class ApiPortal
    {
        public ApiPortal(PortalDto portalDto)
        {
            Name = portalDto.Name;
            Description = portalDto.Description;
            WorkSurfaces = portalDto.WorkSurfaces.OrderBy(x => x.Order).Select(x => new ApiWorkSurface(x)).ToList();
        }

        public string Name { get; set; }
        public string Description { get; set; }
        public List<ApiWorkSurface> WorkSurfaces { get; set; }
    }
}
