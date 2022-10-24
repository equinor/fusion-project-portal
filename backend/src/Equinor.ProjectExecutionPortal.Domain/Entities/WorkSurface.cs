using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Audit;

namespace Equinor.ProjectExecutionPortal.Domain.Entities;

/// <summary>
/// The portal master object which ties all relevant portal data together
/// </summary>
public class WorkSurface : AuditableEntityEntityBase, ICreationAuditable, IModificationAuditable
{
    private readonly List<WorkSurfaceApplication> _applications = new();
    private readonly List<WorkSurfaceAppGroup> _appGroups = new();

    public WorkSurface(string name, int order) : base(Guid.NewGuid())
    {
        Name = name;
        Order = order;
    }

    public string Name { get; set; }
    public int Order { get; set; }

    public IReadOnlyCollection<WorkSurfaceApplication> Applications => _applications.AsReadOnly();
    public IReadOnlyCollection<WorkSurfaceAppGroup> AppGroups => _appGroups.AsReadOnly();

    public void AddApplication(WorkSurfaceApplication application)
    {
        _applications.Add(application);
    }

    public void AddAppGroup(WorkSurfaceAppGroup group)
    {
        _appGroups.Add(group);
    }
}
