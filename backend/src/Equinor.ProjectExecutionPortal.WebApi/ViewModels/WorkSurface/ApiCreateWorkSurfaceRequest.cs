using Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.CreateWorkSurface;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurface
{
    public class ApiCreateWorkSurfaceRequest
    {
        public string Name { get; set; } = null!;
        public string ShortName { get; set; } = null!;
        public string Subtext { get; set; } = null!;
        public string? Description { get; set; }
        public int Order { get; set; }
        public string Icon { get; set; } = null!;

        public CreateWorkSurfaceCommand ToCommand()
        {
            return new CreateWorkSurfaceCommand(Name, ShortName, Subtext, Description, Order, Icon);
        }

        public class CreateWorkSurfaceRequestValidator : AbstractValidator<ApiCreateWorkSurfaceRequest>
        {
            public CreateWorkSurfaceRequestValidator()
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
