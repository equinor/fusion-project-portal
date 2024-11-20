﻿using Equinor.ProjectExecutionPortal.Application.Queries.Accounts;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal;

public class ApiAppOwner
{
    public ApiAppOwner(PortalOwnerDto ownerDto)
    {
        Id = ownerDto.Id;

        WithAccount(ownerDto.Account);
    }

    private void WithAccount(AccountDto? account)
    {
        if (account == null)
            return;

        AzureUniqueId = account.AzureUniqueId;
        DisplayName = account.DisplayName;
        Mail = account.Mail;
        UPN = account.UPN;
        AccountType = account.AccountType;
        AccountClassification = account.AccountClassification;
        IsExpired = account.HasExpired;
    }

    public Guid Id { get; }
    public Guid? AzureUniqueId { get; set; }
    public string? DisplayName { get; set; }
    public string? Mail { get; set; }
    public string? UPN { get; set; }
    public string? AccountType { get; set; }
    public string? AccountClassification { get; set; }
    public bool IsExpired { get; set; }
}
