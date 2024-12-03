using Equinor.ProjectExecutionPortal.Application.Services.AccountService;
using Equinor.ProjectExecutionPortal.Domain.Common;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.Validation;

public static class FluentValidationExtensions
{
    public static IRuleBuilderOptions<T, List<AccountIdentifier>> BeValidAccounts<T>(this IRuleBuilder<T, List<AccountIdentifier>> ruleBuilder, IAccountService accountService)
    {
        return ruleBuilder.SetAsyncValidator(new AccountsValidator<T>(accountService));
    }
}
