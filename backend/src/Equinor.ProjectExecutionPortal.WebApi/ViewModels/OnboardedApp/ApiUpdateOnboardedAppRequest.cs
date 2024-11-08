using Equinor.ProjectExecutionPortal.Application.Commands.OnboardedApps.UpdateOnboardedApp;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp;

public class ApiUpdateOnboardedAppRequest
{
    public required IList<string> ContextTypes { get; init; }

    public UpdateOnboardedAppCommand ToCommand(string appKey)
    {
        return new UpdateOnboardedAppCommand(appKey, ContextTypes);
    }

    public class ApiUpdateOnboardedAppRequestValidator : AbstractValidator<ApiUpdateOnboardedAppRequest>
    {
        public ApiUpdateOnboardedAppRequestValidator()
        {
            RuleFor(x => x.ContextTypes)
                .NotNull()
                .WithMessage("Context Types is required");
        }
    }
}
