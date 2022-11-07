using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Audit;

namespace Equinor.ProjectExecutionPortal.Domain.Entities;

/// <summary>
/// The shared Portal Application base that all applications should inherit from
/// </summary>
public class WorkSurfaceApp : ContextEntityBase, ICreationAuditable, IModificationAuditable
{
    public const int AppKeyLengthMax = 400;

    public WorkSurfaceApp(Guid onboardedAppId, Guid? appGroupId, int order, Guid workSurfaceId, bool isHidden = false) : base("some-context", "context-type")
    {
        OnboardedAppId = onboardedAppId;
        AppGroupId = appGroupId;
        Order = order;
        IsHidden = isHidden;
        WorkSurfaceId = workSurfaceId;
    }

    public int Order { get; set; }
    public bool IsHidden { get; set; }

    public Guid OnboardedAppId { get; set; }
    public OnboardedApp OnboardedApp { get; set; }

    public Guid? AppGroupId { get; set; }
    public WorkSurfaceAppGroup? AppGroup { get; set; }

    public Guid WorkSurfaceId { get; set; }
    public WorkSurface WorkSurface { get; set; }
}
