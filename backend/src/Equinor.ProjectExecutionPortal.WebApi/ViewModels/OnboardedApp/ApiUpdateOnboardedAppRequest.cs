using Equinor.ProjectExecutionPortal.Application.Commands.OnboardedApps.UpdateOnboardedApp;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp
{
    public class ApiUpdateOnboardedAppRequest
    {
        public bool IsLegacy { get; set; }

        public UpdateOnboardedAppCommand ToCommand(string appKey)
        {
            return new UpdateOnboardedAppCommand(appKey, IsLegacy);
        }

        public class ApiUpdateOnboardedAppRequestValidator : AbstractValidator<ApiUpdateOnboardedAppRequest>
        {
            public ApiUpdateOnboardedAppRequestValidator()
            {
                RuleFor(x => x.IsLegacy)
                    .NotNull()
                    .WithMessage("IsLegacy is required");
            }
        }
    }
}
