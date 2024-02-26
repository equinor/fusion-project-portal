using Equinor.ProjectExecutionPortal.Application.Commands.OnboardedApps.OnboardApp;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp
{
    public class ApiOnboardAppRequest
    {
        public string AppKey { get; set; } = null!;
        public bool IsLegacy { get; set; }
        public Guid AppGroupId { get; set; }
        public IList<string>? ContextTypes { get; set; }

        public OnboardAppCommand ToCommand()
        {
            return new OnboardAppCommand(AppKey, IsLegacy, AppGroupId, ContextTypes);
        }

        public class OnboardAppRequestalidator : AbstractValidator<ApiOnboardAppRequest>
        {
            public OnboardAppRequestalidator()
            {
                RuleFor(x => x.AppKey)
                    .NotEmpty()
                    .NotContainScriptTag()
                    .WithMessage("AppKey is required");

                RuleFor(x => x.IsLegacy)
                    .NotNull()
                    .WithMessage("IsLegacy is required");
            }
        }
    }
}
