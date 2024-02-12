using Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.AddContextTypeToWorkSurface;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceContextType
{
    public class ApiAddContextTypeToWorkSurfaceRequest
    {
        public string Type { get; set; } = null!;

        public AddContextTypeToWorkSurfaceCommand ToCommand(Guid workSurfaceId)
        {
            return new AddContextTypeToWorkSurfaceCommand(workSurfaceId, Type);
        }

        public class ApiAddContextTypeToWorkSurfaceRequestValidator : AbstractValidator<ApiAddContextTypeToWorkSurfaceRequest>
        {
            public ApiAddContextTypeToWorkSurfaceRequestValidator()
            {
                RuleFor(x => x.Type)
                    .NotEmpty()
                    .NotContainScriptTag()
                    .WithMessage("Type required");
            }
        }
    }
}
