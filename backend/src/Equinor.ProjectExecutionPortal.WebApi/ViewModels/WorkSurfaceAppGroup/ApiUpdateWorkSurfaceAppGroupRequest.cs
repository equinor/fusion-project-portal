using Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.UpdateAppGroup;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceAppGroup
{
    public class ApiUpdateWorkSurfaceAppGroupRequest
    {
        public string Name { get; set; }
        public string AccentColor { get; set; }

        public UpdateAppGroupCommand ToCommand(Guid workSurfaceId, Guid appGroupId)
        {
            return new UpdateAppGroupCommand(workSurfaceId, appGroupId, Name, AccentColor);
        }

        public class UpdateWorkSurfaceAppGroupRequestValidator : AbstractValidator<ApiUpdateWorkSurfaceAppGroupRequest>
        {
            public UpdateWorkSurfaceAppGroupRequestValidator()
            {
                RuleFor(x => x.Name)
                    .NotEmpty()
                    .NotContainScriptTag()
                    .WithMessage("Name required");

                RuleFor(x => x.AccentColor)
                    .MaximumLength(Domain.Entities.WorkSurfaceAppGroup.AccentColorLengthMax)
                    .NotContainScriptTag();
            }
        }
    }
}
