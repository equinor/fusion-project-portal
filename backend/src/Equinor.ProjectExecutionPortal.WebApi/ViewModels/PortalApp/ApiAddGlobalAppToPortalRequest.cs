using Equinor.ProjectExecutionPortal.Application.Commands.Portals.AddGlobalAppToPortal;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.PortalApp
{
    public class ApiAddGlobalAppToPortalRequest
    {
        public string AppKey { get; set; } = null!;

        /// <summary>
        /// Only for when adding global apps
        /// When set to true, this will potentially remove the app from all contexts where it has previously been specifically set.
        /// This is done to avoid conflict where we have both a global and contextual instance of the same app.
        /// If set to false and the app already has been added to specific contexts, an error will be thrown.
        /// </summary>
        public bool RemoveAppForContexts { get; set; }

        public AddGlobalAppToPortalCommand ToCommand(Guid workSurfaceId)
        {
            return new AddGlobalAppToPortalCommand(workSurfaceId, AppKey, RemoveAppForContexts);
        }

        public class ApiAddGlobalAppToPortalRequestValidator : AbstractValidator<ApiAddGlobalAppToPortalRequest>
        {
            public ApiAddGlobalAppToPortalRequestValidator()
            {
                RuleFor(x => x.AppKey)
                    .NotEmpty()
                    .NotContainScriptTag()
                    .WithMessage("App Key required");
            }
        }
    }
}
