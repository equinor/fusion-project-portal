using Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.UpdateWorkSurface;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurface
{
    public class ApiUpdateWorkSurfaceRequest
    {
        public string Name { get; set; }
        public string ShortName { get; set; }
        public string Subtext { get; set; }
        public string? Description { get; set; }
        public int Order { get; set; }
        public string Icon { get; set; }

        public UpdateWorkSurfaceCommand ToCommand(Guid id)
        {
            return new UpdateWorkSurfaceCommand(id, Name, ShortName, Subtext, Description, Order, Icon);
        }

        public class UpdateWorkSurfaceRequestValidator : AbstractValidator<ApiUpdateWorkSurfaceRequest>
        {
            public UpdateWorkSurfaceRequestValidator()
            {
                RuleFor(x => x.Name)
                    .NotEmpty()
                    .NotContainScriptTag()
                    .WithMessage("Name required");

                RuleFor(x => x.ShortName)
                    .NotEmpty()
                    .NotContainScriptTag()
                    .WithMessage("Short name required");

                RuleFor(x => x.Subtext)
                    .NotEmpty()
                    .NotContainScriptTag()
                    .WithMessage("Sub text required");

                RuleFor(x => x.Description)
                    .NotContainScriptTag()
                    .MaximumLength(Domain.Entities.WorkSurface.DescriptionLengthMax);

                RuleFor(x => x.Order)
                    .NotEmpty()
                    .WithMessage("Order required");
            }
        }
    }
}
