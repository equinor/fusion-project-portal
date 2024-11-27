using Equinor.ProjectExecutionPortal.Application.Infrastructure.Mappings;
using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Accounts;

public class AccountDto : IMapFrom<Account>
{
    public Guid Id { get; set; }
    public Guid AzureUniqueId { get; set; }
    public string AccountType { get; set; }
    public string? AccountClassification { get; set; }

    public DateTimeOffset CreatedDate { get; set; }
    public DateTimeOffset? UpdatedDate { get; set; }
    public DateTimeOffset? LastSyncDate { get; set; }
    public bool HasExpired { get; set; }
    public DateTimeOffset? ExpiredDate { get; set; }
}
