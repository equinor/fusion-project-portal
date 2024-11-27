using Equinor.ProjectExecutionPortal.Application.Infrastructure.Mappings;
using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Accounts;

public class PortalAdminDto : IMapFrom<PortalAdmin>
{
    public PortalAdminDto(PortalAdmin admin)
    {
        Id = admin.Id;
        PortalId = admin.PortalId;
        AccountId = admin.AccountId;
    }

    public PortalAdminDto WithAccount(Account? account)
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

    public static PortalAdminDto? CreateOrDefault(PortalAdmin? admin)
    {
        return admin is null ? null : new PortalAdminDto(admin);
    }
}
