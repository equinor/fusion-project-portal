using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Audit;

namespace Equinor.ProjectExecutionPortal.Infrastructure.Entities;

/// <summary>
/// An Application Group acts as a grouping and ordering of selected portal applications
/// TODO: Nested grouping
/// </summary>
public class WorkSurfaceApplicationGroup : AuditableEntityBase, ICreationAuditable, IModificationAuditable
{
    private readonly List<WorkSurfaceApplication> _applications = new();

    public WorkSurfaceApplicationGroup(string name, int order) : base("facility")
    {
        Name = name;
        Order = order;
    }

    public string Name { get; set; }
    public int Order { get; set; }

    public IReadOnlyCollection<WorkSurfaceApplication> Applications => _applications.AsReadOnly();
}
