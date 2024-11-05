using Equinor.ProjectExecutionPortal.Application.Commands.Portals.UpdatePortal;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal;

public class ApiUpdatePortalRequest
{
    public required string Name { get; init; } 
    public required string ShortName { get; init; }
    public required string Subtext { get; init; } 
    public string? Description { get; init; }
    public required string Icon { get; init; } 
    public required IList<string> ContextTypes { get; init; }

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
                .WithMessage("DisplayName required");

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