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
            WorkSurfaces = portalDto.WorkSurfaces.Select(x => new ApiWorkSurface(x)).ToList();
        }

        public string Name { get; }
        public string Description { get; }
        public List<ApiWorkSurface> WorkSurfaces { get; }
    }
}
