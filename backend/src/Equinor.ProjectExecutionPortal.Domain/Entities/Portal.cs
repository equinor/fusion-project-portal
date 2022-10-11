using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Audit;

namespace Equinor.ProjectExecutionPortal.Infrastructure.Entities;

/// <summary>
/// The portal master object which ties all relevant portal data together
/// It consists of multiple Work Surfaces, each with their own apps ++
/// </summary>
public abstract class Portal : AuditableEntityBase, ICreationAuditable, IModificationAuditable // PERHAPS ABSTRACT
{
    private readonly List<WorkSurface> _workSurfaces = new();

    protected Portal(string name, string description) : base("facility")
    {
        Name = name;
        Description = description;
    }

    public string Name { get; set; }
    public string Description { get; set; }

    public IReadOnlyCollection<WorkSurface> WorkSurfaces => _workSurfaces.AsReadOnly();
}
