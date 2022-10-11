using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Audit;

namespace Equinor.ProjectExecutionPortal.Infrastructure.Entities;

/// <summary>
/// Administrators for managing portal and work surfaces. E.g. onboarding apps
/// </summary>
public class PortalAdmin : AuditableEntityBase, ICreationAuditable, IModificationAuditable
{
    public PortalAdmin(Guid azureUniqueId) : base("facility")
    {
        AzureUniqueId = azureUniqueId;
    }

    public Guid AzureUniqueId { get; set; }
}
