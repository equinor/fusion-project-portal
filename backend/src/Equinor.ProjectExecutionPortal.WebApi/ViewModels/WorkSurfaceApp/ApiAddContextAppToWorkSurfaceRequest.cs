using Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.AddContextAppToWorkSurface;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceApp
{
    public class ApiAddContextAppToWorkSurfaceRequest
    {
        public string AppKey { get; set; } = null!;

        public AddContextAppToWorkSurfaceCommand ToCommand(Guid workSurfaceId, string contextExternalId)
        {
            return new AddContextAppToWorkSurfaceCommand(workSurfaceId, contextExternalId, AppKey);
        }

        public class ApiAddContextAppToWorkSurfaceRequestValidator : AbstractValidator<ApiAddContextAppToWorkSurfaceRequest>
        {
            public ApiAddContextAppToWorkSurfaceRequestValidator()
            {
                RuleFor(x => x.AppKey)
                    .NotEmpty()
                    .NotContainScriptTag()
                    .WithMessage("App Key required");
            }
        }
    }
}
