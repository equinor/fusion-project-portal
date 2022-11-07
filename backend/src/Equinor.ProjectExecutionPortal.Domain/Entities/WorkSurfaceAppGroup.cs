using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Audit;

namespace Equinor.ProjectExecutionPortal.Domain.Entities;

/// <summary>
/// An Application Group acts as a grouping and ordering of selected portal applications
/// TODO: Nested grouping
///
/// </summary>
public class WorkSurfaceAppGroup : AuditableEntityBase, ICreationAuditable, IModificationAuditable
{
    public const int NameLengthMax = 200;
    public const int AccentColorLengthMax = 7;

    private readonly List<WorkSurfaceApplication> _applications = new();
    
    public WorkSurfaceAppGroup(string name, int order, string accentColor)
    {
        Name = name;
        Order = order;
        AccentColor = accentColor;
    }

    public string Name { get; set; }
    public int Order { get; set; }
    public string AccentColor { get; set; }

    public Guid WorkSurfaceId { get; set; }
    public WorkSurface WorkSurface { get; set; }

    public IReadOnlyCollection<WorkSurfaceApplication> Applications => _applications.AsReadOnly();

    public void AddApplication(WorkSurfaceApplication application)
    {
        _applications.Add(application);
    }
}
