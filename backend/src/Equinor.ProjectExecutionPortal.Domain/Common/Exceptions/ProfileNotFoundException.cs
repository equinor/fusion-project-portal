namespace Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;

public class ProfileNotFoundError : Exception
{
    public ProfileNotFoundError(AccountIdentifier accountIdentifier) : base($"Could not resolve account with identifier '{accountIdentifier.AzureUniqueId}'.") { }

    public ProfileNotFoundError(string message) : base(message) { }
}
