using Equinor.ProjectExecutionPortal.Application.Commands.AppGroups.CreateAppGroup;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.AppGroup
{
    public class ApiCreateAppGroupRequest
    {
        public string Name { get; set; } = null!;
        public string AccentColor { get; set; } = null!;

        public CreateAppGroupCommand ToCommand()
        {
            return new CreateAppGroupCommand(Name, AccentColor);
        }

        public class CreateAppGroupRequestValidator : AbstractValidator<ApiCreateAppGroupRequest>
        {
            public CreateAppGroupRequestValidator()
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
