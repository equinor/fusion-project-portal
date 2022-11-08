using Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.AddWorkSurfaceApp;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.Admin
{
    public class ApiAddWorkSurfaceAppRequest
    {
        public string AppKey { get; set; }
        public Guid? AppGroupId { get; set; }
        public int Order { get; set; }

        public AddWorkSurfaceAppCommand ToCommand(Guid workSurfaceId, string? externalContextId)
        {
            return new AddWorkSurfaceAppCommand(workSurfaceId, externalContextId, AppKey, AppGroupId, Order);
        }

        public class AddWorkSurfaceAppRequestValidator : AbstractValidator<ApiAddWorkSurfaceAppRequest>
        {
            public AddWorkSurfaceAppRequestValidator()
            {
                RuleFor(x => x.AppKey)
                    .NotEmpty()
                    .NotContainScriptTag()
                    .WithMessage("App Key required");

                RuleFor(x => x.Order)
                    .NotEmpty()
                    .WithMessage("Order required"); ;
            }
        }
    }
}
