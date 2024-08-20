using Equinor.ProjectExecutionPortal.Application.Commands.Portals.RemovePortal;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal
{
    public class ApiRemovePortalRequest
    {
        public Guid Id { get; set; }

        public RemovePortalCommand ToCommand(Guid id)
        {
            return new RemovePortalCommand(Id);
        }

        public class RemovePortalRequestValidator : AbstractValidator<ApiRemovePortalRequest>
        {
            public RemovePortalRequestValidator()
            {
                RuleFor(x => x.Id)
                    .NotEmpty()
                    .WithMessage("Id required");
            }
        }
    }
}
