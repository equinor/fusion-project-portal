using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Audit;

namespace Equinor.ProjectExecutionPortal.Domain.Entities;

/// <summary>
/// The shared Portal Application base that all applications should inherit from
/// </summary>
public class WorkSurfaceApp : ContextEntityBase, ICreationAuditable, IModificationAuditable
{
    public WorkSurfaceApp(Guid onboardedAppId, Guid workSurfaceId, string externalContextId, string externalContextType, bool isHidden = false)
        : base(externalContextId, externalContextType)
    {
        OnboardedAppId = onboardedAppId;
        IsHidden = isHidden;
        WorkSurfaceId = workSurfaceId;
    }

    public WorkSurfaceApp(Guid onboardedAppId, Guid workSurfaceId, bool isHidden = false) : base(null, null)
    {
        OnboardedAppId = onboardedAppId;
        IsHidden = isHidden;
        WorkSurfaceId = workSurfaceId;
    }

    public bool IsHidden { get; set; }

    public Guid OnboardedAppId { get; set; }
    public OnboardedApp OnboardedApp { get; set; }
    
    public Guid WorkSurfaceId { get; set; }
    public WorkSurface WorkSurface { get; set; }
}
