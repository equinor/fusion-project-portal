using Equinor.ProjectExecutionPortal.Application.Commands.Portals.AddContextTypeToPortal;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.PortalContextType
{
    public class ApiAddContextTypeToPortalRequest
    {
        public string Type { get; set; } = null!;

        public AddContextTypeToPortalCommand ToCommand(Guid workSurfaceId)
        {
            return new AddContextTypeToPortalCommand(workSurfaceId, Type);
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
}
