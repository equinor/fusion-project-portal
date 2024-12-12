using Equinor.ProjectExecutionPortal.Domain.Common;
using Fusion.Integration;
using Fusion.Integration.Profile;
using ProfileNotFoundError = Equinor.ProjectExecutionPortal.Domain.Common.Exceptions.ProfileNotFoundError;

namespace Equinor.ProjectExecutionPortal.Application.Services.AccountService;

public class AccountService : IAccountService
{
    private readonly IFusionProfileResolver _profileResolver;

    public AccountService(IFusionProfileResolver profileResolver)
    {
        _profileResolver = profileResolver;
    }

    public async Task<IEnumerable<ResolvedPersonProfile>> ResolveProfilesOrThrowAsync(IEnumerable<AccountIdentifier> accountIdentifiers, CancellationToken cancellationToken = default)
    {
        var resolvedProfiles = await ResolveProfilesAsync(accountIdentifiers, cancellationToken);
        var resolvedProfilesList = resolvedProfiles.ToList();
        var unresolvedProfiles = resolvedProfilesList.Where(x => !x.Success).ToList();

        if (unresolvedProfiles.Any())
        {
            throw new ProfileNotFoundError($"Could not resolve the following user profiles: '{string.Join(",", unresolvedProfiles)}'");
        }

        return resolvedProfilesList;
    }

    public async Task<IEnumerable<ResolvedPersonProfile>> ResolveProfilesAsync(IEnumerable<AccountIdentifier> accountIdentifiers, CancellationToken cancellationToken = default)
    {
        var personIdentifiers = accountIdentifiers.Select(person => new PersonIdentifier(person.AzureUniqueId));
        return await _profileResolver.ResolvePersonsAsync(personIdentifiers, cancellationToken);
    }
}
