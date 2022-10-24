using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Audit;

namespace Equinor.ProjectExecutionPortal.Domain.Entities;

/// <summary>
/// The portal master object which ties all relevant portal data together
/// It consists of multiple Work Surfaces, each with their own apps ++
/// </summary>
public class Portal : AuditableEntityEntityBase, ICreationAuditable, IModificationAuditable
{
    private readonly List<WorkSurface> _workSurfaces = new();

    protected Portal(string name, string description) : base(Guid.NewGuid())
    {
        Name = name;
        Description = description;
    }

    public string Name { get; set; }
    public string Description { get; set; }

    public IReadOnlyCollection<WorkSurface> WorkSurfaces => _workSurfaces.AsReadOnly();

    public void AddWorkSurface(WorkSurface workSurface)
    {
        _workSurfaces.Add(workSurface);
    }
}
