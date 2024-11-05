using Equinor.ProjectExecutionPortal.Application.Commands.OnboardedApps.OnboardApp;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp
{
    public class ApiOnboardAppRequest
    {
        public required string AppKey { get; init; } 
        public required IList<string> ContextTypes { get; init; }

        public OnboardAppCommand ToCommand()
        {
            return new OnboardAppCommand(AppKey, ContextTypes);
        }

        public class OnboardAppRequestValidator : AbstractValidator<ApiOnboardAppRequest>
        {
            public OnboardAppRequestValidator()
            {
                RuleFor(x => x.AppKey)
                    .NotEmpty()
                    .NotContainScriptTag()
                    .WithMessage("AppKey is required");
            }
        }
    }
}
