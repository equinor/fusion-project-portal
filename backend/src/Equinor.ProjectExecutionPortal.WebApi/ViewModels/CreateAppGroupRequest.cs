using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels
{
    public class CreateAppGroupRequest
    {
        public string Name { get; set; }
        public string Color { get; set; }
        public string DefaultIcon { get; set; }
        

        public class CreateAppGroupRequestValidator: AbstractValidator<CreateAppGroupRequest>
        {
            public CreateAppGroupRequestValidator()
            {
                RuleFor(x => x.Name)
                    .NotEmpty()
                    .NotContainScriptTag()
                    .WithMessage("Name required");

                RuleFor(x => x.Color)
                    .NotEmpty()
                    .NotContainScriptTag()
                    .WithMessage("Color required");

                RuleFor(x => x.DefaultIcon)
                    .NotEmpty()
                    .NotContainScriptTag()
                    .WithMessage("DefaultIcon required");
            }
        }

    }
}
