using Equinor.ProjectExecutionPortal.Application.Commands.AppGroups.UpdateAppGroup;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.AppGroup
{
    public class ApiUpdateAppGroupRequest
    {
        public string Name { get; set; } = null!;
        public string AccentColor { get; set; } = null!;

        public UpdateAppGroupCommand ToCommand(Guid appGroupId)
        {
            return new UpdateAppGroupCommand(appGroupId, Name, AccentColor);
        }

        public class UpdateAppGroupRequestValidator : AbstractValidator<ApiUpdateAppGroupRequest>
        {
            public UpdateAppGroupRequestValidator()
            {
                RuleFor(x => x.Name)
                    .NotEmpty()
                    .NotContainScriptTag()
                    .WithMessage("Name required");

                RuleFor(x => x.AccentColor)
                    .MaximumLength(Domain.Entities.AppGroup.AccentColorLengthMax)
                    .NotContainScriptTag();
            }
        }
    }
}
