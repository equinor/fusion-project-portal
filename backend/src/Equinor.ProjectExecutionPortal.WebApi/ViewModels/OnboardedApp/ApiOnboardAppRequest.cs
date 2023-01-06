using Equinor.ProjectExecutionPortal.Application.Commands.OnboardedApps.OnboardApp;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp
{
    public class ApiOnboardAppRequest
    {
        public string AppKey { get; set; }
        public Guid AppGroupId { get; set; }

        public OnboardAppCommand ToCommand()
        {
            return new OnboardAppCommand(AppKey, AppGroupId);
        }

        public class OnboardAppRequestalidator : AbstractValidator<ApiOnboardAppRequest>
        {
            public OnboardAppRequestalidator()
            {
                RuleFor(x => x.AppKey)
                    .NotEmpty()
                    .NotContainScriptTag()
                    .WithMessage("AppKey is required");
            }
        }
    }
}
