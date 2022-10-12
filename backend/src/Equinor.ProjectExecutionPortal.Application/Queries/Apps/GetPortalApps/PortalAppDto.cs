namespace Equinor.ProjectExecutionPortal.Application.Queries.Apps.GetPortalApps;

public class PortalAppDto : BaseContextDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int Order { get; set; }
    public string Icon { get; set; }
    public string IconAccentColor { get; set; }
    public bool IsHidden { get; set; }
    public bool IsPublished { get; set; }
}
