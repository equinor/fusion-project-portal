using Equinor.ProjectExecutionPortal.Application.Commands.Portals.UpdatePortal;
using Equinor.ProjectExecutionPortal.Application.Services.AccountService;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal;

public class ApiUpdatePortalRequest
{
    public required string Name { get; init; }
    public required string ShortName { get; init; }
    public required string Subtext { get; init; }
    public string? Description { get; init; }
    public required string Icon { get; init; }
    public required List<string> ContextTypes { get; init; }
    public List<ApiAccountIdentifier> Admins { get; init; } = [];

    public UpdatePortalCommand ToCommand(Guid id)
    {
        return new UpdatePortalCommand(id, Name, ShortName, Subtext, Description, Icon, ContextTypes, Admins.Select(identifer => identifer.ToAccountIdentifier()).ToList());
    }

    public class UpdatePortalRequestValidator : AbstractValidator<ApiUpdatePortalRequest>
    {
        public UpdatePortalRequestValidator(IAccountService accountService)
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

            RuleFor(x => x.Admins)
                .NotEmpty()
                .WithMessage("Must specify at least one admin");

            //RuleFor(x => x.Admins).BeValidAccounts(accountService);
        }
    }
}
