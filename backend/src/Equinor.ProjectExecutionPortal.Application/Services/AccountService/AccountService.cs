using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using Fusion.Integration;
using Fusion.Integration.Profile;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Services.AccountService;

public class AccountService : IAccountService
{
    private readonly IFusionProfileResolver _profileResolver;
    private readonly IReadWriteContext _context;
    private static readonly SemaphoreSlim Locker = new(1);

    public AccountService(IFusionProfileResolver profileResolver, IReadWriteContext context)
    {
        _profileResolver = profileResolver;
        _context = context;
    }

    public async Task<Account> EnsurePersonAsync(AccountIdentifier accountIdentifier, CancellationToken cancellationToken = default)
    {
        await Locker.WaitAsync(cancellationToken);

        try
        {
            FusionPersonProfile? profile = null;
            var personAzureUniqueId = accountIdentifier.UniqueId;

            if (accountIdentifier.Type == AccountIdentifier.IdentifierType.Mail)
            {
                profile = await ResolveProfileAsync(accountIdentifier, cancellationToken);

                if (profile is null)
                {
                    throw new AccountNotFoundError(accountIdentifier);
                }

                personAzureUniqueId = profile.AzureUniqueId;
            }

            if (personAzureUniqueId is not null && personAzureUniqueId != Guid.Empty)
            {
                var account = await _context.Set<Account>().FirstOrDefaultAsync(p => p.AzureUniqueId == personAzureUniqueId, cancellationToken);

                if (account != null)
                {
                    return account;
                }
            }

            // Load profile into database
            profile ??= await ResolveProfileAsync(accountIdentifier, cancellationToken);

            if (profile == null)
            {
                throw new AccountNotFoundError(accountIdentifier);
            }

            if (profile.AzureUniqueId == null)
            {
                throw new InvalidOperationException("Cannot ensure a profile without an azure unique id");
            }

            var newAcccount = new Account
            {
                Id = Guid.NewGuid(),
                AzureUniqueId = profile.AzureUniqueId.Value,
                AccountType = profile.AccountType.ToString(),
                AccountClassification = profile.AccountClassification?.ToString(),
                CreatedDate = DateTimeOffset.UtcNow
            };

            await _context.Set<Account>().AddAsync(newAcccount, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return newAcccount;
        }
        finally
        {
            Locker.Release();
        }
    }

    public async Task<Account?> EnsureApplicationAsync(Guid azureUniqueId, CancellationToken cancellationToken = default)
    {
        await Locker.WaitAsync(cancellationToken);

        try
        {
            var account = await _context.Set<Account>().FirstOrDefaultAsync(p => p.AzureUniqueId == azureUniqueId, cancellationToken);
            if (account != null)
            {
                return account;
            }

            var profile = await ResolveServicePrincipalAsync(azureUniqueId, cancellationToken);

            if (profile == null)
            {
                return null;
            }

            account = new Account
            {
                AzureUniqueId = azureUniqueId,
                AccountType = $"{FusionAccountType.Application}",
                AccountClassification = string.Empty,
                CreatedDate = DateTimeOffset.UtcNow
            };

            await _context.Set<Account>().AddAsync(account, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return account;
        }
        finally
        {
            Locker.Release();
        }
    }

    public async Task<FusionPersonProfile?> ResolveProfileAsync(AccountIdentifier accountIdentifier, CancellationToken cancellationToken = default)
    {
        try
        {
            var resolvedProfiles = await ResolveProfilesAsync([accountIdentifier], cancellationToken);
            return resolvedProfiles.FirstOrDefault(p => p.Success)?.Profile;
        }
        catch (Exception)
        {
            return null;
        }
    }

    public async Task<IEnumerable<ResolvedPersonProfile>> ResolveProfilesAsync(IEnumerable<AccountIdentifier> accountIdentifiers, CancellationToken cancellationToken = default)
    {
        var personIdentifiers = accountIdentifiers.Select(person => PersonIdentifier.Parse(person.OriginalIdentifier));
        return await _profileResolver.ResolvePersonsAsync(personIdentifiers, cancellationToken);
    }

    public async Task<FusionApplicationProfile?> ResolveServicePrincipalAsync(Guid servicePrincipalUniqueId, CancellationToken cancellationToken = default)
    {
        try
        {
            return await _profileResolver.ResolveServicePrincipalAsync(servicePrincipalUniqueId, cancellationToken: cancellationToken);
        }
        catch (Exception)
        {
            return null;
        }
    }

    public async Task<IEnumerable<FusionApplicationProfile>> ResolveServicePrincipalsAsync(IEnumerable<Guid> servicePrincipalUniqueIds, CancellationToken cancellationToken = default)
    {
        var servicePrincipals = new List<FusionApplicationProfile>();
        foreach (var servicePrincipalUniqueId in servicePrincipalUniqueIds)
        {
            var profile = await ResolveServicePrincipalAsync(servicePrincipalUniqueId, cancellationToken);
            if (profile is not null)
            {
                servicePrincipals.Add(profile);
            }
        }

        return servicePrincipals;
    }

    public async Task<Account?> EnsurePersonOrDefaultAsync(AccountIdentifier? accountIdentifier, CancellationToken cancellationToken = default)
    {
        if (accountIdentifier is not null)
        {
            var account = await EnsurePersonAsync(accountIdentifier, cancellationToken);
            return account;
        }

        return null;
    }
}
