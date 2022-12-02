using Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.CreateAppGroup;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceAppGroup
{
    public class ApiCreateWorkSurfaceAppGroupRequest
    {
        public string Name { get; set; }
        public string AccentColor { get; set; }

        public CreateAppGroupCommand ToCommand()
        {
            return new CreateAppGroupCommand(Name, AccentColor);
        }

        public class CreateWorkSurfaceAppGroupRequestValidator : AbstractValidator<ApiCreateWorkSurfaceAppGroupRequest>
        {
            public CreateWorkSurfaceAppGroupRequestValidator()
            {
                RuleFor(x => x.Name)
                    .NotEmpty()
                    .NotContainScriptTag()
                    .WithMessage("Name is required");

                RuleFor(x => x.AccentColor)
                    .MaximumLength(Domain.Entities.AppGroup.AccentColorLengthMax)
                    .NotContainScriptTag();
            }
        }
    }
}
