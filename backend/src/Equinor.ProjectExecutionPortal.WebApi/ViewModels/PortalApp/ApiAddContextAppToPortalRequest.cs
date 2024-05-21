using Equinor.ProjectExecutionPortal.Application.Commands.Portals.AddContextAppToPortal;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.PortalApp
{
    public class ApiAddContextAppToPortalRequest
    {
        public string AppKey { get; set; } = null!;

        public AddContextAppToPortalCommand ToCommand(Guid workSurfaceId, Guid contextId)
        {
            return new AddContextAppToPortalCommand(workSurfaceId, contextId, AppKey);
        }

        public class ApiAddContextAppToPortalRequestValidator : AbstractValidator<ApiAddContextAppToPortalRequest>
        {
            public ApiAddContextAppToPortalRequestValidator()
            {
                RuleFor(x => x.AppKey)
                    .NotEmpty()
                    .NotContainScriptTag()
                    .WithMessage("App Key required");
            }
        }
    }
}
