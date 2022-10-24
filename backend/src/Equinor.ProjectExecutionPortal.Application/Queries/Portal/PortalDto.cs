using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Portal;

public class PortalDto : BaseContextDto
{
    public string Name { get; set; }
    public string Description { get; set; }
    public List<WorkSurfaceDto> WorkSurfaces { get; set; }
}
