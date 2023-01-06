using Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.AddWorkSurfaceApp;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceApp
{
    public class ApiAddWorkSurfaceAppRequest
    {
        public string AppKey { get; set; }

        public AddWorkSurfaceAppCommand ToCommand(Guid workSurfaceId, string? contextExternalId, string? contextType)
        {
            return new AddWorkSurfaceAppCommand(workSurfaceId, contextExternalId, contextType, AppKey);
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
