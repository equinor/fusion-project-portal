using Equinor.ProjectExecutionPortal.Application.Commands.OnboardedApps.UpdateOnboardedApp;
using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedContexts.GetOnboardedContext;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp
{
    public class ApiUpdateOnboardedAppRequest
    {
        public bool IsLegacy { get; set; }
        public IList<string>? ContextTypes { get; set; }

        public UpdateOnboardedAppCommand ToCommand(string appKey)
        {
            return new UpdateOnboardedAppCommand(appKey, IsLegacy, ContextTypes);
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
