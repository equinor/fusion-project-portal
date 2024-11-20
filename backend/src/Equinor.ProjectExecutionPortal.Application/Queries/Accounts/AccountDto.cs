using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Accounts;

public class AccountDto
{
    public AccountDto(Account account)
    {
        Id = account.Id;
        AzureUniqueId = account.AzureUniqueId;
        Mail = account.Mail;
        DisplayName = account.DisplayName;
        UPN = account.UPN;
        AccountType = account.AccountType;
        AccountClassification = account.AccountClassification;

        CreatedDate = account.CreatedDate;
        UpdatedDate = account.UpdatedDate;
        LastSyncDate = account.LastSyncDate;
        HasExpired = account.HasExpired;
        ExpiredDate = account.ExpiredDate;
    }

    public Guid Id { get; private set; }
    public Guid AzureUniqueId { get; set; }
    public string? Mail { get; set; }
    public string DisplayName { get; set; }
    public string? UPN { get; set; }
    public string AccountType { get; set; }
    public string? AccountClassification { get; set; }

    public DateTimeOffset CreatedDate { get; set; }
    public DateTimeOffset? UpdatedDate { get; set; }
    public DateTimeOffset? LastSyncDate { get; set; }
    public bool HasExpired { get; set; }
    public DateTimeOffset? ExpiredDate { get; set; }
}
