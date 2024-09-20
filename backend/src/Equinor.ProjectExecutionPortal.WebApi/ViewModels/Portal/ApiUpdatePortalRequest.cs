using Equinor.ProjectExecutionPortal.Application.Commands.Portals.UpdatePortal;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal
{
    public class ApiUpdatePortalRequest
    {
        public string Name { get; set; } = null!;
        public string ShortName { get; set; } = null!;
        public string Subtext { get; set; } = null!;
        public string? Description { get; set; }
        public string Icon { get; set; } = null!;
        public IList<string>? ContextTypes { get; set; }

        public UpdatePortalCommand ToCommand(Guid id)
        {
            return new UpdatePortalCommand(id, Name, ShortName, Subtext, Description, Icon, ContextTypes);
        }

        public class UpdatePortalRequestValidator : AbstractValidator<ApiUpdatePortalRequest>
        {
            public UpdatePortalRequestValidator()
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
            }
        }
    }
}
