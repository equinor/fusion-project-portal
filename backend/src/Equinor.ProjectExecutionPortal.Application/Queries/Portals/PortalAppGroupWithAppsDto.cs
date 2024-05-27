
namespace Equinor.ProjectExecutionPortal.Application.Queries.Portals
{
    public class PortalAppGroupWithAppsDto
    {
        public string Name { get; set; }
        public int Order { get; set; }
        public string AccentColor { get; set; }
        public List<PortalAppDto> Apps { get; set; }
    }
}
