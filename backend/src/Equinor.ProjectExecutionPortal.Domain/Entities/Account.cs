namespace Equinor.ProjectExecutionPortal.Domain.Entities;

public class Account
{
    public Guid Id { get; set; }
    public Guid AzureUniqueId { get; set; }
    public string? Mail { get; set; }
    public string DisplayName { get; set; } = string.Empty;
    public string? UPN { get; set; }
    public string AccountType { get; set; } = string.Empty;
    public string? AccountClassification { get; set; }

    public DateTimeOffset CreatedDate { get; set; }
    public DateTimeOffset? UpdatedDate { get; set; }
    public DateTimeOffset? LastSyncDate { get; set; }
    public bool HasExpired { get; set; }
    public DateTimeOffset? ExpiredDate { get; set; }

    public ICollection<PortalAdmin> PortalAdmins { get; set; } = new HashSet<PortalAdmin>();
    public ICollection<PortalOwner> PortalOwners { get; set; } = new HashSet<PortalOwner>();
}
