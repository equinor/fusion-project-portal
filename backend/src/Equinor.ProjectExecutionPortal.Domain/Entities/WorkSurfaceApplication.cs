using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Audit;

namespace Equinor.ProjectExecutionPortal.Infrastructure.Entities;

/// <summary>
/// The shared Portal Application base that all applications should inherit from
/// </summary>
public abstract class WorkSurfaceApplication : AuditableEntityBase, ICreationAuditable, IModificationAuditable
{
    protected WorkSurfaceApplication(string name, Guid? groupId, int order) : base("facility")
    {
        Name = name;
        GroupId = groupId;
        Order = order;
    }

    /// <summary>
    /// Fusion Portal application reference ID
    /// </summary>
    public Guid? ApplicationId { get; set; }

    public string Name { get; set; }
    public int Order { get; set; }
    public bool IsHidden { get; set; }
    public bool IsPublished { get; set; }

    public string Type { get; set; } // Should this be fetched from Fusion Portal?

    // Metadata. Should this be fetched from Fusion Portal?

    public string Icon { get; set; }
    public string IconAccentColor { get; set; }

    // Relations

    public Guid? GroupId { get; set; }
    public WorkSurfaceApplicationGroup? Group { get; set; }

    public Guid WorkSurfaceId { get; set; }
    public WorkSurface WorkSurface { get; set; }
}
