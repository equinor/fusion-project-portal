using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Audit;

namespace Equinor.ProjectExecutionPortal.Domain.Entities;

/// <summary>
/// The Work Surface App is the link between a Work Surface, an onboarded app and an onboarded context
/// </summary>
public class PortalApp : AuditableEntityBase, ICreationAuditable, IModificationAuditable
{
    public PortalApp(Guid onboardedAppId, Guid workSurfaceId, Guid onboardedContextId, bool isHidden = false)
    {
        OnboardedAppId = onboardedAppId;
        IsHidden = isHidden;
        WorkSurfaceId = workSurfaceId;
        OnboardedContextId = onboardedContextId;
    }

    public PortalApp(Guid onboardedAppId, Guid workSurfaceId, bool isHidden = false)
    {
        OnboardedAppId = onboardedAppId;
        IsHidden = isHidden;
        WorkSurfaceId = workSurfaceId;
    }

    public bool IsHidden { get; set; }

    public Guid OnboardedAppId { get; set; }
    public OnboardedApp OnboardedApp { get; set; }
    
    public Guid WorkSurfaceId { get; set; }
    public Portal WorkSurface { get; set; }

    public Guid? OnboardedContextId { get; set; }
    public OnboardedContext? OnboardedContext { get; set; }

    public bool IsGlobal => OnboardedContextId == null;
    public bool IsContextual => OnboardedContextId.HasValue;
}
