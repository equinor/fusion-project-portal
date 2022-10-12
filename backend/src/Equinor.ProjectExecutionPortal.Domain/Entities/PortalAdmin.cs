using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Audit;

namespace Equinor.ProjectExecutionPortal.Domain.Entities;

/// <summary>
/// Administrators for managing portal and work surfaces. E.g. onboarding apps
/// This could perhaps become Context or Work Surface dependent, e.g unique admins pr Context / Work Surface
/// </summary>
public class PortalAdmin : AuditableEntityEntityBase, ICreationAuditable, IModificationAuditable
{
    public PortalAdmin(Guid azureUniqueId) : base(Guid.NewGuid())
    {
        AzureUniqueId = azureUniqueId;
    }

    public Guid AzureUniqueId { get; set; }
}
