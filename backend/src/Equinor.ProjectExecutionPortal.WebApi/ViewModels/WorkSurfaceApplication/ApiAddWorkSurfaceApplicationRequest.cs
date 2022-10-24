using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceAppGroup;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceApplication
{
    public class ApiAddWorkSurfaceApplicationRequest
    {
        public string Name { get; set; }
        public int Order { get; set; }

        public class AddWorkSurfaceApplicationRequestValidator : AbstractValidator<ApiCreateWorkSurfaceAppGroupRequest>
        {
            public AddWorkSurfaceApplicationRequestValidator()
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
