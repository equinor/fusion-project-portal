using Equinor.ProjectExecutionPortal.Application.Services.AccountService;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.Validation;

public static class FluentValidationExtensions
{
    public static IRuleBuilderOptions<T, List<ApiAccountIdentifier>> BeValidAccounts<T>(this IRuleBuilder<T, List<ApiAccountIdentifier>> ruleBuilder, IAccountService accountService)
    {
        return ruleBuilder.SetAsyncValidator(new AccountsValidator<T>(accountService));
    }
}
