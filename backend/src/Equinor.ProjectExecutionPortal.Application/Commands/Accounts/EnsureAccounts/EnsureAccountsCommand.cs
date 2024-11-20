using Equinor.ProjectExecutionPortal.Application.Queries.Accounts;
using Equinor.ProjectExecutionPortal.Application.Services.AccountService;
using Equinor.ProjectExecutionPortal.Domain.Common;
using MediatR;

namespace Equinor.ProjectExecutionPortal.Application.Commands.Accounts.EnsureAccounts;

public class EnsureAccountsCommand : IRequest<IDictionary<AccountIdentifier, AccountDto?>>
{
    public EnsureAccountsCommand(AccountIdentifier accountIdentifier)
    {
        AccountIdentifiers = [accountIdentifier];
    }

    public EnsureAccountsCommand(IReadOnlyCollection<AccountIdentifier> accountIdentifiers)
    {
        AccountIdentifiers = accountIdentifiers;
    }

    public EnsureAccountsCommand NoThrow()
    {
        ShouldThrow = false;
        return this;
    }

    public IReadOnlyCollection<AccountIdentifier> AccountIdentifiers { get; private set; }
    public bool ShouldThrow { get; private set; } = true;

    public class Handler : IRequestHandler<EnsureAccountsCommand, IDictionary<AccountIdentifier, AccountDto?>>
    {
        private readonly IAccountService _accountService;

        public Handler(IAccountService accountService)
        {
            _accountService = accountService;
        }

        public async Task<IDictionary<AccountIdentifier, AccountDto?>> Handle(EnsureAccountsCommand command, CancellationToken cancellationToken)
        {
            var ensuredAccounts = new Dictionary<AccountIdentifier, AccountDto?>();
            var notFound = new List<AccountIdentifier>();

            foreach (var identifier in command.AccountIdentifiers.Distinct())
            {
                var account = await EnsureAccountAsync(identifier, cancellationToken);
                ensuredAccounts.Add(identifier, account);

                if (account is null)
                {
                    notFound.Add(identifier);
                }

                cancellationToken.ThrowIfCancellationRequested();
            }

            if (command.ShouldThrow && notFound.Count > 0)
            {
                throw new InvalidOperationException();
                //throw new EnsureAccountsError(notFound);
            }

            return ensuredAccounts;
        }

        private async Task<AccountDto?> EnsureAccountAsync(AccountIdentifier accountIdentifier, CancellationToken cancellationToken)
        {
            var account = await _accountService.EnsurePersonOrDefaultAsync(accountIdentifier, cancellationToken);

            if (account is null && accountIdentifier.Type == AccountIdentifier.IdentifierType.UniqueId)
            {
                account = await _accountService.EnsureApplicationAsync(accountIdentifier.UniqueId!.Value, cancellationToken);
            }

            if (account is null)
            {
                return null;
            }

            return new AccountDto(account);
        }
    }
}
