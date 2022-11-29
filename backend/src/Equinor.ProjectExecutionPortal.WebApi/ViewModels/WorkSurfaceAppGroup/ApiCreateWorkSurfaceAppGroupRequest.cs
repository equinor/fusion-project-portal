using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceAppGroup
{
    public class ApiCreateWorkSurfaceAppGroupRequest
    {
        public string Name { get; set; }
        public int Order { get; set; }

        public class CreateWorkSurfaceAppGroupRequestValidator : AbstractValidator<ApiCreateWorkSurfaceAppGroupRequest>
        {
            public CreateWorkSurfaceAppGroupRequestValidator()
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
