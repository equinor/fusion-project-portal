using Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.CreateAppGroup;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.AppGroup
{
    public class ApiCreateAppGroupRequest
    {
        public string Name { get; set; }
        public string AccentColor { get; set; }

        public CreateAppGroupCommand ToCommand()
        {
            return new CreateAppGroupCommand(Name, AccentColor);
        }

        public class CreateWorkSurfaceAppGroupRequestValidator : AbstractValidator<ApiCreateAppGroupRequest>
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
