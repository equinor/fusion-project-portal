using Equinor.ProjectExecutionPortal.Application.Commands.Portals.UpdatePortalConfiguration;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal
{
    public class ApiUpdatePortalConfigurationRequest
    {
        public string? Router { get; set; }

        public UpdatePortalConfigurationCommand ToCommand(Guid portalId)
        {
            return new UpdatePortalConfigurationCommand(portalId, Router);
        }

        public class UpdatePortalConfigurationValidator : AbstractValidator<ApiUpdatePortalConfigurationRequest>
        {
            public UpdatePortalConfigurationValidator()
            {
                RuleFor(x => x.Router)
                    .NotContainScriptTag()
                    .MaximumLength(Domain.Entities.PortalConfiguration.RouterLengthMax);
            }
        }
    }
}
