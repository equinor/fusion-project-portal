namespace Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;

public class AccountNotFoundError : Exception
{
    public AccountNotFoundError(AccountIdentifier accountIdentifier) : base($"Could not resolve account with identifier '{accountIdentifier.OriginalIdentifier}'.") { }
}
