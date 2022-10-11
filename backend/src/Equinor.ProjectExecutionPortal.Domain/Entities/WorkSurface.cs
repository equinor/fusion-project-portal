using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Audit;

namespace Equinor.ProjectExecutionPortal.Infrastructure.Entities;

/// <summary>
/// The portal master object which ties all relevant portal data together
/// </summary>
public class WorkSurface : AuditableEntityBase, ICreationAuditable, IModificationAuditable
{
    private readonly List<WorkSurfaceApplication> _applications = new();
    private readonly List<WorkSurfaceApplicationGroup> _applicationGroups = new();
    private readonly List<WorkSurfaceLink> _portalLinks = new();

    public WorkSurface(string name) : base("facility")
    {
        Name = name;
    }

    public string Name { get; set; }

    public IReadOnlyCollection<WorkSurfaceApplication> Applications => _applications.AsReadOnly();
    public IReadOnlyCollection<WorkSurfaceApplicationGroup> ApplicationGroups => _applicationGroups.AsReadOnly();
    public IReadOnlyCollection<WorkSurfaceLink> PortalLinks => _portalLinks.AsReadOnly();

    public void AddApplication(WorkSurfaceApplication application)
    {
        _applications.Add(application);
    }

    public void AddApplicationGroup(WorkSurfaceApplicationGroup group)
    {
        _applicationGroups.Add(group);
    }

    public void AddPortalLink(WorkSurfaceLink link)
    {
        _portalLinks.Add(link);
    }
}
