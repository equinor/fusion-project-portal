using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Audit;

namespace Equinor.ProjectExecutionPortal.Domain.Entities;

/// <summary>
/// The shared Portal Application base that all applications should inherit from
/// </summary>
///
/// TODO: Consider a separate Application table to persist whitelisted apps. Then refer to it from here.
/// By doing this, we have better control over where apps are used and if apps are removed from whitelist
/// 
public class WorkSurfaceApplication : ContextEntityBase, ICreationAuditable, IModificationAuditable
{
    public const int AppKeyLengthMax = 400;

    public WorkSurfaceApplication(string appKey, Guid? appGroupId, int order, Guid workSurfaceId, bool isHidden = false) : base("some-context", "context-type")
    {
        AppKey = appKey;
        AppGroupId = appGroupId;
        Order = order;
        IsHidden = isHidden;
        WorkSurfaceId = workSurfaceId;
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
