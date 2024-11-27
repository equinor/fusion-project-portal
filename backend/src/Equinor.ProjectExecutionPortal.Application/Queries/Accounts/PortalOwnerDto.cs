using Equinor.ProjectExecutionPortal.Application.Infrastructure.Mappings;
using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Accounts;

public class PortalOwnerDto : IMapFrom<PortalOwner>
{
    public PortalOwnerDto(PortalOwner owner)
    {
        Id = owner.Id;
        PortalId = owner.PortalId;
        AccountId = owner.AccountId;
    }

    public PortalOwnerDto WithAccount(Account? account)
    {
        if (account is null)
        {
            return this;
        }

        Account = new AccountDto(account);
        return this;
    }

    public Guid Id { get; }
    public Guid PortalId { get; set; }
    public Guid AccountId { get; set; }
    public AccountDto? Account { get; set; }

    public static PortalOwnerDto? CreateOrDefault(PortalOwner? owner)
    {
        return owner is null ? null : new PortalOwnerDto(owner);
    }
}
