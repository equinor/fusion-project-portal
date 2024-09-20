using Equinor.ProjectExecutionPortal.Application.Commands.OnboardedApps.AddContextTypeToOnboardedApp;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedAppContextType
{
    public class ApiAddContextTypeToOnboardedAppRequest
    {
        public string Type { get; set; } = null!;

        public AddContextTypeToOnboardedAppCommand ToCommand(string appKey)
        {
            return new AddContextTypeToOnboardedAppCommand(appKey, Type);
        }

        public class ApiAddContextTypeToOnboardedAppRequestValidator : AbstractValidator<ApiAddContextTypeToOnboardedAppRequest>
        {
            public ApiAddContextTypeToOnboardedAppRequestValidator()
            {
                RuleFor(x => x.Type)
                    .NotEmpty()
                    .NotContainScriptTag()
                    .WithMessage("Type required");
            }
        }
    }
}
