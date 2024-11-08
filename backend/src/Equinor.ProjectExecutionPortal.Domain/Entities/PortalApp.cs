using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Audit;

namespace Equinor.ProjectExecutionPortal.Domain.Entities;

/// <summary>
/// The Work Surface App is the link between a Work Surface, an onboarded app and an onboarded context
/// </summary>
public class PortalApp : AuditableEntityBase, ICreationAuditable, IModificationAuditable
{
    public PortalApp(Guid onboardedAppId, Guid portalId, Guid onboardedContextId, bool isHidden = false)
    {
        OnboardedAppId = onboardedAppId;
        IsHidden = isHidden;
        PortalId = portalId;
        OnboardedContextId = onboardedContextId;
    }

    public PortalApp(Guid onboardedAppId, Guid portalId, bool isHidden = false)
    {
        OnboardedAppId = onboardedAppId;
        IsHidden = isHidden;
        PortalId = portalId;
    }

    public bool IsHidden { get; set; }

    public Guid OnboardedAppId { get; set; }
    public OnboardedApp OnboardedApp { get; set; } = null!;

    public Guid PortalId { get; set; }
    public Portal Portal { get; set; } = null!;

    public Guid? OnboardedContextId { get; set; }
    public OnboardedContext? OnboardedContext { get; set; }

    public bool IsGlobal => OnboardedContextId == null;
    public bool IsContextual => OnboardedContextId.HasValue;
}
