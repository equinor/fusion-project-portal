using Equinor.ProjectExecutionPortal.Application.Commands.Portals.AddContextTypeToPortal;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.PortalContextType;

public class ApiAddContextTypeToPortalRequest
{
    public required string Type { get; set; } 

    public AddContextTypeToPortalCommand ToCommand(Guid portalId)
    {
        return new AddContextTypeToPortalCommand(portalId, Type);
    }

    public class ApiAddContextTypeToPortalRequestValidator : AbstractValidator<ApiAddContextTypeToPortalRequest>
    {
        public ApiAddContextTypeToPortalRequestValidator()
        {
            RuleFor(x => x.Type)
                .NotEmpty()
                .NotContainScriptTag()
                .WithMessage("Type required");
        }
    }
}
