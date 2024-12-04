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
    private static readonly SemaphoreSlim Locker = new(1);
    private readonly IReadWriteContext _context;
    private readonly IFusionProfileResolver _profileResolver;

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
            var profile = await ResolveProfileAsync(accountIdentifier, cancellationToken);

            if (profile is null)
            {
                throw new AccountNotFoundError(accountIdentifier);
            }

            var personAzureUniqueId = profile.AzureUniqueId;

            if (personAzureUniqueId is not null && personAzureUniqueId != Guid.Empty)
            {
                var account = await _context.Set<Account>()
                    .FirstOrDefaultAsync(account => account.AzureUniqueId == personAzureUniqueId, cancellationToken);

                if (account != null)
                {
                    return account;
                }
            }

            // Load profile into database
            if (personAzureUniqueId == null)
            {
                throw new InvalidOperationException("Cannot ensure a profile without an azure unique id");
            }

            var newAcccount = new Account { AzureUniqueId = personAzureUniqueId.Value };

            await _context.Set<Account>().AddAsync(newAcccount, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return newAcccount;
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
        var personIdentifiers = accountIdentifiers.Select(person => new PersonIdentifier(person.AzureUniqueId));
        return await _profileResolver.ResolvePersonsAsync(personIdentifiers, cancellationToken);
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
