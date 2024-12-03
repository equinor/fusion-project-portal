namespace Equinor.ProjectExecutionPortal.Domain.Common;

/// <summary>
///     Azure Unique Id
/// </summary>
public class AccountIdentifier
{
    public Guid AzureUniqueId { get; set; }

    //#region Validator

    //public class Validator : AbstractValidator<AccountIdentifier>
    //{
    //    public Validator()
    //    {
    //        RuleFor(x => x.OriginalIdentifier).NotEmpty().NotContainScriptTag();
    //        RuleFor(x => x.AzureUniqueId).NotEmptyIfProvided();
    //        RuleFor(x => x.Mail).IsValidEmail().When(x => x.Mail is not null);
    //        RuleFor(x => x).Must(x => x.AzureUniqueId.HasValue || !string.IsNullOrEmpty(x.Mail)).WithMessage("Either azureUniqueId or mail must be specified");
    //    }
    //}

    //#endregion
}
