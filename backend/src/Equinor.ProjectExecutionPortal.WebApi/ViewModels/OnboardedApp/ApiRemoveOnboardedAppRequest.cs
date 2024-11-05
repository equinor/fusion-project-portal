using Equinor.ProjectExecutionPortal.Application.Commands.OnboardedApps.RemoveOnboardedApp;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp;

public class ApiRemoveOnboardedAppRequest
{
    public required string AppKey { get; init; }

    public RemoveOnboardedAppCommand ToCommand()
    {
        return new RemoveOnboardedAppCommand(AppKey);
    }

    public class RemoveOnboardedAppRequestValidator : AbstractValidator<ApiRemoveOnboardedAppRequest>
    {
        public RemoveOnboardedAppRequestValidator()
        {
            RuleFor(x => x.AppKey)
                .NotEmpty()
                .WithMessage("AppKey is required");
        }
    }
}