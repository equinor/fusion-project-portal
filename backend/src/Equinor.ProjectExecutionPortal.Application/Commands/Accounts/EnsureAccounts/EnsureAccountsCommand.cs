using AutoMapper;
using Equinor.ProjectExecutionPortal.Application.Queries.Accounts;
using Equinor.ProjectExecutionPortal.Application.Services.AccountService;
using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
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

    public IReadOnlyCollection<AccountIdentifier> AccountIdentifiers { get; }
    public bool ShouldThrow { get; private set; } = true;

    public EnsureAccountsCommand NoThrow()
    {
        ShouldThrow = false;
        return this;
    }

    public class Handler : IRequestHandler<EnsureAccountsCommand, IDictionary<AccountIdentifier, AccountDto?>>
    {
        private readonly IAccountService _accountService;
        private readonly IMapper _mapper;

        public Handler(IAccountService accountService, IMapper mapper)
        {
            _accountService = accountService;
            _mapper = mapper;
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
                throw new EnsureAccountsException(notFound);
            }

            return ensuredAccounts;
        }

        private async Task<AccountDto?> EnsureAccountAsync(AccountIdentifier accountIdentifier, CancellationToken cancellationToken)
        {
            var account = await _accountService.EnsurePersonOrDefaultAsync(accountIdentifier, cancellationToken);

            return account is null ? null : _mapper.Map<Account, AccountDto>(account);
        }
    }
}
