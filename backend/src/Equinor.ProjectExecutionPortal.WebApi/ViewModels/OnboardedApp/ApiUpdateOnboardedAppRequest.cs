using Equinor.ProjectExecutionPortal.Application.Commands.OnboardedApps.UpdateOnboardedApp;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp
{
    public class ApiUpdateOnboardedAppRequest
    {
        public IList<string>? ContextTypes { get; set; }

        public UpdateOnboardedAppCommand ToCommand(string appKey)
        {
            return new UpdateOnboardedAppCommand(appKey, ContextTypes);
        }

        public class ApiUpdateOnboardedAppRequestValidator : AbstractValidator<ApiUpdateOnboardedAppRequest>
        {
            public ApiUpdateOnboardedAppRequestValidator()
            {
               
            }
        }
    }
}
