using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Fusion.Integration.Profile;

namespace Equinor.ProjectExecutionPortal.Application.Services.AccountService;

public interface IAccountService
{
    /// <summary>
    /// Attempting to resolve a profile using the Fusion People Service.
    /// If the profile cannot be resolved, an error will be thrown.
    /// </summary>
    /// <param name="accountIdentifier">An identifier representing the profile to be resolved.</param>
    /// <param name="cancellationToken">A System.Threading.CancellationToken to observe while waiting for the task to complete.</param>
    /// <returns>Account persisted in database</returns>
    Task<Account> EnsurePersonAsync(AccountIdentifier accountIdentifier, CancellationToken cancellationToken = default);

    /// <summary>
    /// Attempting to resolve a person using the Fusion People Service.
    /// Will return null if person cannot be resolved.
    /// </summary>
    /// <param name="accountIdentifier">An identifier representing the profile to be resolved.</param>
    /// <param name="cancellationToken">A System.Threading.CancellationToken to observe while waiting for the task to complete.</param>
    /// <returns>Account persisted in database or null if uses does not exist</returns>
    Task<Account?> EnsurePersonOrDefaultAsync(AccountIdentifier? accountIdentifier, CancellationToken cancellationToken = default);

    /// <summary>
    /// Attempting to resolve an application identity using the Fusion People Service.
    /// Will return null if account cannot be resolved.
    /// </summary>
    /// <param name="azureUniqueId">A guid representing the application identity.</param>
    /// <param name="cancellationToken">A System.Threading.CancellationToken to observe while waiting for the task to complete.</param>
    /// <returns>Account persisted in database or null if uses does not exist</returns>
    Task<Account?> EnsureApplicationAsync(Guid azureUniqueId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Attempts to resolve a Fusion basic profile.
    /// </summary>
    /// <param name="accountIdientifier">An identifier representing the profile to be resolved.</param>
    /// <param name="cancellationToken">A System.Threading.CancellationToken to observe while waiting for the task to complete.</param>
    /// <returns>Resolved profiles if exists. Else null</returns>
    Task<FusionPersonProfile?> ResolveProfileAsync(AccountIdentifier accountIdientifier, CancellationToken cancellationToken = default);

    /// <summary>
    /// Resolve multiple Fusion profiles. 
    /// </summary>
    /// <param name="accountIdentifiers">Identifiers representing the persons to be resolved</param>
    /// <param name="cancellationToken">A System.Threading.CancellationToken to observe while waiting for the task to complete.</param>
    /// <returns>A list of resolved profiles.</returns>
    Task<IEnumerable<ResolvedPersonProfile>> ResolveProfilesAsync(IEnumerable<AccountIdentifier> accountIdentifiers, CancellationToken cancellationToken = default);

    /// <summary>
    /// Attempts to resolve a Fusion service principal
    /// </summary>
    /// <param name="servicePrincipalUniqueId">An identifier representing the service principal to be resolved</param>
    /// <param name="cancellationToken">A System.Threading.CancellationToken to observe while waiting for the task to complete.</param>
    /// <returns>Resolved service principal profile. Else null</returns>
    Task<FusionApplicationProfile?> ResolveServicePrincipalAsync(Guid servicePrincipalUniqueId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Resolves multiple service principals
    /// </summary>
    /// <param name="servicePrincipalUniqueIds">Identifiers representing the service principals to be resolved</param>
    /// <param name="cancellationToken">A System.Threading.CancellationToken to observe while waiting for the task to complete.</param>
    /// <returns>A list of resolved profiles</returns>
    Task<IEnumerable<FusionApplicationProfile>> ResolveServicePrincipalsAsync(IEnumerable<Guid> servicePrincipalUniqueIds, CancellationToken cancellationToken = default);
}
