using Equinor.ProjectExecutionPortal.Domain.Common.Audit;
using Equinor.ProjectExecutionPortal.Domain.Common;

namespace Equinor.ProjectExecutionPortal.Domain.Entities;

public class PortalAdmin : AuditableEntityBase, ICreationAuditable
{
    public Guid PortalId { get; init; }
    public Portal Portal { get; init; } = null!;
    public Guid AzureUniqueId { get; init; }
}
