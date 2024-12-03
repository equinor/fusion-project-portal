using Equinor.ProjectExecutionPortal.Domain.Common.Audit;
using Equinor.ProjectExecutionPortal.Domain.Common;

namespace Equinor.ProjectExecutionPortal.Domain.Entities;

public class Account : AuditableEntityBase, ICreationAuditable, IModificationAuditable
{
    public const int AccountTypeLengthMax = 30;
    public const int AccountClassificationLengthMax = 30;

    public Guid AzureUniqueId { get; set; }

    public ICollection<PortalAdmin> PortalAdmins { get; set; } = new HashSet<PortalAdmin>();
}
