using Equinor.ProjectExecutionPortal.Application.Queries.Accounts;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal;

public class ApiPortalAdmin
{
#pragma warning disable CS8618 // For integration tests only
    public ApiPortalAdmin() { }
#pragma warning restore CS8618 // For integration tests only

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
