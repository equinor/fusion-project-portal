using Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.AddContextWorkSurfaceApp;
using Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.AddGlobalWorkSurfaceApp;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceApp
{
    public class ApiAddWorkSurfaceAppRequest
    {
        public string AppKey { get; set; }

        public AddContextWorkSurfaceAppCommand ToCommand(Guid workSurfaceId, string? contextExternalId)
        {
            return new AddContextWorkSurfaceAppCommand(workSurfaceId, contextExternalId, AppKey);
        }

        public AddGlobalWorkSurfaceAppCommand ToCommand(Guid workSurfaceId)
        {
            return new AddGlobalWorkSurfaceAppCommand(workSurfaceId, AppKey);
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
