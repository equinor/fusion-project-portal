using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Audit;

namespace Equinor.ProjectExecutionPortal.Domain.Entities;

/// <summary>
///     Base class for User Accounts.
///     The main reason we have this is to provide expandability in the future.
/// </summary>
public class Account : AuditableEntityBase, ICreationAuditable, IModificationAuditable
{
    private readonly List<PortalAdmin> _portalAdmins = [];

    public Guid AzureUniqueId { get; init; }

    public IReadOnlyCollection<PortalAdmin> PortalAdmins => _portalAdmins.AsReadOnly();
}
