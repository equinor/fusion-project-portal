using Equinor.ProjectExecutionPortal.Application.Queries.Accounts;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal;

public class ApiPortalAdmin
{
    public ApiPortalAdmin(PortalAdminDto adminDto)
    {
        Id = adminDto.Id;
        WithAccount(adminDto.Account);
    }

    public Guid Id { get; set; }
    public Guid AzureUniqueId { get; set; }

    private void WithAccount(AccountDto? account)
    {
        if (account == null)
        {
            return;
        }

        AzureUniqueId = account.AzureUniqueId;
    }
}
