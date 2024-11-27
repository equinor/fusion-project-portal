namespace Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;

public class EnsureAccountsException(IReadOnlyCollection<AccountIdentifier> accountIdentifiers) 
    : Exception($"Unable to resolve accounts with identifiers: {string.Join(',', accountIdentifiers)}");

