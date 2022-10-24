using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurface
{
    public class ApiCreateWorkSurfaceRequest
    {
        public string Name { get; set; }
        public int Order { get; set; }

        public class CreateWorkSurfaceRequestValidator : AbstractValidator<ApiCreateWorkSurfaceRequest>
        {
            public CreateWorkSurfaceRequestValidator()
            {
                RuleFor(x => x.Name)
                    .NotEmpty()
                    .NotContainScriptTag()
                    .WithMessage("Name required");

                RuleFor(x => x.Order)
                    .NotEmpty()
                    .WithMessage("Order required"); ;
            }
        }
    }
}
