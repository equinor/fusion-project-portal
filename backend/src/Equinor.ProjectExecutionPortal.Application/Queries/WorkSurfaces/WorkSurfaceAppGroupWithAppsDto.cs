namespace Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaces
{
    public class WorkSurfaceAppGroupWithAppsDto
    {
        public string Name { get; set; }
        public int Order { get; set; }
        public string AccentColor { get; set; }
        public List<WorkSurfaceAppDto> Apps { get; set; }
    }
}
