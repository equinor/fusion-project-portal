using Equinor.ProjectExecutionPortal.Application.Infrastructure.Mappings;
using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Accounts;

public class AccountDto : AuditDto, IMapFrom<Account>
{
    public Guid Id { get; set; }
    public Guid AzureUniqueId { get; set; }
}
