using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Audit;

namespace Equinor.ProjectExecutionPortal.Domain.Entities;

/// <summary>
/// The shared Portal Application base that all applications should inherit from
/// </summary>
public class WorkSurfaceApplication : ContextEntityBase, ICreationAuditable, IModificationAuditable
{
    public const int AppKeyLengthMax = 400;

    protected WorkSurfaceApplication(string appKey, Guid? appGroupId, int order, bool isHidden) : base("some-context", "context-type")
    {
        AppKey = appKey;
        AppGroupId = appGroupId;
        Order = order;
        IsHidden = isHidden;
    }

    /// <summary>
    /// Fusion Portal application reference ID
    /// </summary>
    public string AppKey{ get; set; }
    public int Order { get; set; }
    public bool IsHidden { get; set; }

    // Relations

    public Guid? AppGroupId { get; set; }
    public WorkSurfaceAppGroup? AppGroup { get; set; }

    public Guid WorkSurfaceId { get; set; }
    public WorkSurface WorkSurface { get; set; }
}
