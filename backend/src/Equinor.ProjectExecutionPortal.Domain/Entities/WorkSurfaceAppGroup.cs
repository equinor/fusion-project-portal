using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Audit;

namespace Equinor.ProjectExecutionPortal.Domain.Entities;

/// <summary>
/// An Application Group acts as a grouping and ordering of selected portal applications
/// TODO: Nested grouping
/// </summary>
public class WorkSurfaceAppGroup : ContextEntityBase, ICreationAuditable, IModificationAuditable
{
    public const int NameLengthMax = 200;

    private readonly List<WorkSurfaceApplication> _applications = new();

    // Collaboration: Meeting & Review, Project Information: Task, OrgChart, Construction & Commissioning: Handover, WorkOrder, SWCR, Demo: Fungerende app

    public WorkSurfaceAppGroup(string name, int order) : base("some-context", "context type")
    {
        Name = name;
        Order = order;
    }

    public string Name { get; set; }
    public int Order { get; set; }

    public Guid WorkSurfaceId { get; set; }
    public WorkSurface WorkSurface { get; set; }

    public IReadOnlyCollection<WorkSurfaceApplication> Applications => _applications.AsReadOnly();

    public void AddApplication(WorkSurfaceApplication application)
    {
        _applications.Add(application);
    }
}
