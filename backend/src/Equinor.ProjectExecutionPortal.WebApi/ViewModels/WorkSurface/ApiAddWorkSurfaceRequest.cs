using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurface
{
    public class ApiAddWorkSurfaceRequest
    {
        public string Name { get; set; }
        public int Order { get; set; }

        public class AddWorkSurfaceRequestValidator : AbstractValidator<ApiAddWorkSurfaceRequest>
        {
            public AddWorkSurfaceRequestValidator()
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
