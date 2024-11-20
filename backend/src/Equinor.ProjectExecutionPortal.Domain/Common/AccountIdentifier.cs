namespace Equinor.ProjectExecutionPortal.Domain.Common;

/// <summary>
/// Azure Unique Id or Email
/// </summary>
public class AccountIdentifier : IEquatable<AccountIdentifier>
{
    public AccountIdentifier(string identifier)
    {
        OriginalIdentifier = identifier;

        if (Guid.TryParse(identifier, out var id))
        {
            UniqueId = id;
            Mail = null;
            Type = IdentifierType.UniqueId;
        }
        else
        {
            UniqueId = null;
            Mail = identifier;
            Type = IdentifierType.Mail;
        }
    }

    public AccountIdentifier(Guid uniqueId)
    {
        OriginalIdentifier = $"{uniqueId}";
        UniqueId = uniqueId;
        Mail = null;
        Type = IdentifierType.UniqueId;
    }

    public Guid? UniqueId { get; set; }
    public string OriginalIdentifier { get; set; }
    public string? Mail { get; set; }
    public IdentifierType Type { get; set; }

    public enum IdentifierType { UniqueId, Mail }

    public override string ToString()
    {
        return OriginalIdentifier;
    }

    public override bool Equals(object? obj)
    {
        return Equals(obj as AccountIdentifier);
    }

    public bool Equals(AccountIdentifier? other)
    {
        return other != null && string.Compare(OriginalIdentifier, other.OriginalIdentifier, StringComparison.OrdinalIgnoreCase) == 0;
    }

    public override int GetHashCode()
    {
        return OriginalIdentifier.GetHashCode();
    }

    public static implicit operator AccountIdentifier(string identifier)
    {
        return new AccountIdentifier(identifier);
    }

    public static implicit operator AccountIdentifier(Guid uniqueId)
    {
        return new AccountIdentifier(uniqueId);
    }

    //public static implicit operator Fusion.Integration.Profile.PersonIdentifier(AccountIdentifier personId)
    //{
    //    return Integration.Profile.PersonIdentifier.Parse(personId.OriginalIdentifier);
    //}

    //#region Validator

    //public class Validator : AbstractValidator<AccountIdentifier>
    //{
    //    public Validator()
    //    {
    //        RuleFor(x => x.OriginalIdentifier).NotEmpty().NotContainScriptTag();
    //        RuleFor(x => x.UniqueId).NotEmptyIfProvided();
    //        RuleFor(x => x.Mail).IsValidEmail().When(x => x.Mail is not null);
    //        RuleFor(x => x).Must(x => x.UniqueId.HasValue || !string.IsNullOrEmpty(x.Mail)).WithMessage("Either azureUniqueId or mail must be specified");
    //    }
    //}

    //#endregion
}
