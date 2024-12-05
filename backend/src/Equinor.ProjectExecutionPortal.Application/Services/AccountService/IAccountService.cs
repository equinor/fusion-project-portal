using Equinor.ProjectExecutionPortal.Domain.Common;
using Fusion.Integration.Profile;

namespace Equinor.ProjectExecutionPortal.Application.Services.AccountService;

public interface IAccountService
{
    /// <summary>
    ///     Resolve multiple Fusion profiles.
    /// </summary>
    /// <param name="accountIdentifiers">Identifiers representing the persons to be resolved</param>
    /// <param name="cancellationToken">A System.Threading.CancellationToken to observe while waiting for the task to complete.</param>
    /// <returns>A list of resolved profiles.</returns>
    Task<IEnumerable<ResolvedPersonProfile>> ResolveProfilesAsync(IEnumerable<AccountIdentifier> accountIdentifiers, CancellationToken cancellationToken = default);

    /// <summary>
    ///     Resolve multiple Fusion profiles.
    /// </summary>
    /// <param name="accountIdentifiers">Identifiers representing the persons to be resolved</param>
    /// <param name="cancellationToken">A System.Threading.CancellationToken to observe while waiting for the task to complete.</param>
    /// <returns>A list of resolved profiles.</returns>
    Task<IEnumerable<ResolvedPersonProfile>> ResolveProfilesOrThrowAsync(IEnumerable<AccountIdentifier> accountIdentifiers, CancellationToken cancellationToken = default);
}
