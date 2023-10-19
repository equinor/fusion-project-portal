using Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.AddGlobalAppToWorkSurface;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceApp
{
    public class ApiAddGlobalAppToWorkSurfaceRequest
    {
        public string AppKey { get; set; } = null!;

        /// <summary>
        /// Only for when adding global apps
        /// When set to true, this will potentially remove the app from all contexts where it has previously been specifically set.
        /// This is done to avoid conflict where we have both a global and contextual instance of the same app.
        /// If set to false and the app already has been added to specific contexts, an error will be thrown.
        /// </summary>
        public bool RemoveAppForContexts { get; set; }

        public AddGlobalAppToWorkSurfaceCommand ToCommand(Guid workSurfaceId)
        {
            return new AddGlobalAppToWorkSurfaceCommand(workSurfaceId, AppKey, RemoveAppForContexts);
        }

        public class ApiAddGlobalAppToWorkSurfaceRequestValidator : AbstractValidator<ApiAddGlobalAppToWorkSurfaceRequest>
        {
            public ApiAddGlobalAppToWorkSurfaceRequestValidator()
            {
                RuleFor(x => x.AppKey)
                    .NotEmpty()
                    .NotContainScriptTag()
                    .WithMessage("App Key required");
            }
        }
    }
}
