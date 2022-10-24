using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Audit;

namespace Equinor.ProjectExecutionPortal.Domain.Entities;

/// <summary>
/// An Application Group acts as a grouping and ordering of selected portal applications
/// TODO: Nested grouping
/// </summary>
public class WorkSurfaceAppGroup : AuditableEntityEntityBase, ICreationAuditable, IModificationAuditable
{
    private readonly List<WorkSurfaceApplication> _applications = new();

    public WorkSurfaceAppGroup(string name, int order) : base(Guid.NewGuid())
    {
        Name = name;
        Order = order;
    }

    public string Name { get; set; }
    public int Order { get; set; }

    public IReadOnlyCollection<WorkSurfaceApplication> Applications => _applications.AsReadOnly();
}
