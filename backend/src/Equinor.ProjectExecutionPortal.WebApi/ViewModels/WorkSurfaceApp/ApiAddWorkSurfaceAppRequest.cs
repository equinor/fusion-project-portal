using Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.AddContextAppToWorkSurface;
using Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.AddGlobalAppToWorkSurface;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceApp
{
    public class ApiAddWorkSurfaceAppRequest
    {
        public string AppKey { get; set; }

        public AddContextAppToWorkSurfaceCommand ToCommand(Guid workSurfaceId, string contextExternalId)
        {
            return new AddContextAppToWorkSurfaceCommand(workSurfaceId, contextExternalId, AppKey);
        }

        public AddGlobalAppToWorkSurfaceCommand ToCommand(Guid workSurfaceId)
        {
            return new AddGlobalAppToWorkSurfaceCommand(workSurfaceId, AppKey);
        }

        public class AddWorkSurfaceAppRequestValidator : AbstractValidator<ApiAddWorkSurfaceAppRequest>
        {
            public AddWorkSurfaceAppRequestValidator()
            {
                RuleFor(x => x.AppKey)
                    .NotEmpty()
                    .NotContainScriptTag()
                    .WithMessage("App Key required");
            }
        }
    }
}
