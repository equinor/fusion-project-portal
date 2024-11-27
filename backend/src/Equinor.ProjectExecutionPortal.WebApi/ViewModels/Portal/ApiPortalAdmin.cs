﻿using Equinor.ProjectExecutionPortal.Application.Queries.Accounts;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal;

public class ApiPortalAdmin
{
    public ApiPortalAdmin(PortalAdminDto adminDto)
    {
        Id = adminDto.Id;

        WithAccount(adminDto.Account);
    }

    private void WithAccount(AccountDto? account)
    {
        if (account == null)
            return;

        AzureUniqueId = account.AzureUniqueId;
        AccountType = account.AccountType;
        AccountClassification = account.AccountClassification;
        IsExpired = account.HasExpired;
    }

    public Guid Id { get; }
    public Guid? AzureUniqueId { get; set; }
    public string? AccountType { get; set; }
    public string? AccountClassification { get; set; }
    public bool IsExpired { get; set; }
}
