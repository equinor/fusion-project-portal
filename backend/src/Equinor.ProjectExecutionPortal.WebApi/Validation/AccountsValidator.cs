using Equinor.ProjectExecutionPortal.Application.Services.AccountService;
using Equinor.ProjectExecutionPortal.Domain.Common;
using FluentValidation;
using FluentValidation.Results;
using FluentValidation.Validators;
using Fusion;
using Fusion.Integration.Profile;

namespace Equinor.ProjectExecutionPortal.WebApi.Validation;

public class AccountsValidator<T> : AsyncPropertyValidator<T, List<AccountIdentifier>>
{
    private readonly IAccountService _accountService;

    public AccountsValidator(IAccountService accountService)
    {
        _accountService = accountService;
    }

    public override string Name => "AccountsValidator";

    public override async Task<bool> IsValidAsync(ValidationContext<T> context, List<AccountIdentifier> accounts, CancellationToken cancellationToken)
    {
        var resolvedProfiles = (await _accountService.ResolveProfilesAsync(accounts, cancellationToken)).ToList();

        var profiles = resolvedProfiles.Where(profile => profile.Success)
            .Select(p => p.Profile!)
            .ToList();

        // Remove all accounts that are service principals
        profiles.RemoveAll(profile => profile.AccountType == FusionAccountType.Application);

        if (profiles.Count != accounts.Count)
        {
            var propName = context.DisplayName.ToCamelCase();

            context.AddFailure(new ValidationFailure(propName,
                $"Could not locate one or more accounts specified as {propName}. Found: {string.Join(", ", profiles.Select(a => a.Mail ?? a.AzureUniqueId.ToString()))}",
                accounts));

            return false;
        }

        return true;
    }
}
