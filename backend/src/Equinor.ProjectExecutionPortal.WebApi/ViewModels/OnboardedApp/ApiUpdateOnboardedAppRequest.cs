using Equinor.ProjectExecutionPortal.Application.Commands.OnboardedApps.UpdateOnboardedApp;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp
{
    public class ApiUpdateOnboardedAppRequest
    {
        public Guid AppGroupId { get; set; }

        public UpdateOnboardedAppCommand ToCommand(string appKey)
        {
            return new UpdateOnboardedAppCommand(appKey, AppGroupId);
        }

        public class ApiUpdateOnboardedAppRequestValidator : AbstractValidator<ApiUpdateOnboardedAppRequest>
        {
            public ApiUpdateOnboardedAppRequestValidator()
            {
                RuleFor(x => x.AppGroupId)
                    .NotEmpty()
                    .WithMessage("App Group is required");
            }
        }
    }
}
