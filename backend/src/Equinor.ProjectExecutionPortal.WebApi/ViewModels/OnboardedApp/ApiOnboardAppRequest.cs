using Equinor.ProjectExecutionPortal.Application.Commands.OnboardedApps.OnboardApp;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp
{
    public class ApiOnboardAppRequest
    {
        public string AppKey { get; set; } = null!;
        public IList<string>? ContextTypes { get; set; }

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
