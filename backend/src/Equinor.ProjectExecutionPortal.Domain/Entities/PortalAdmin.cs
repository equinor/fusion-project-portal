using Equinor.ProjectExecutionPortal.Domain.Common.Audit;
using Equinor.ProjectExecutionPortal.Domain.Common;

namespace Equinor.ProjectExecutionPortal.Domain.Entities;

public class PortalAdmin : AuditableEntityBase, ICreationAuditable
{
    public Guid PortalId { get; set; }
    public Portal Portal { get; set; } = null!;
    public Guid AccountId { get; set; }
    public Account Account { get; set; } = null!;
}
