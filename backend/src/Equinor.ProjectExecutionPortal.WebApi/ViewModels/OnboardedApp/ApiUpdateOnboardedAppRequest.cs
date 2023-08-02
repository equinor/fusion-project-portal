using Equinor.ProjectExecutionPortal.Application.Commands.OnboardedApps.UpdateOnboardedApp;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp
{
    public class ApiUpdateOnboardedAppRequest
    {
        public Guid AppGroupId { get; set; }
        public bool IsLegacy { get; set; }

        public UpdateOnboardedAppCommand ToCommand(string appKey)
        {
            return new UpdateOnboardedAppCommand(appKey, IsLegacy, AppGroupId);
        }

        public class ApiUpdateOnboardedAppRequestValidator : AbstractValidator<ApiUpdateOnboardedAppRequest>
        {
            public ApiUpdateOnboardedAppRequestValidator()
            {
                RuleFor(x => x.AppGroupId)
                    .NotEmpty()
                    .WithMessage("App Group is required");

                RuleFor(x => x.IsLegacy)
                    .NotNull()
                    .WithMessage("IsLegacy is required");
            }
        }
    }
}
