using Equinor.ProjectExecutionPortal.Application.Commands.Portals.CreatePortal;

using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal
{
    public class ApiCreatePortalRequest
    {
        public string Name { get; set; } = null!;
        public string ShortName { get; set; } = null!;
        public string Subtext { get; set; } = null!;
        public string? Description { get; set; }
        public int Order { get; set; }
        public string Icon { get; set; } = null!;
        public IList<string>? ContextTypes { get; set; }

        public CreatePortalCommand ToCommand()
        {
            return new CreatePortalCommand(Name, ShortName, Subtext, Description, Order, Icon, ContextTypes);
        }

        public class CreatePortalRequestValidator : AbstractValidator<ApiCreatePortalRequest>
        {
            public CreatePortalRequestValidator()
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
                    .MaximumLength(Domain.Entities.Portal.DescriptionLengthMax);

                RuleFor(x => x.Order)
                    .NotEmpty()
                    .WithMessage("Order required");
            }
        }
    }
}
