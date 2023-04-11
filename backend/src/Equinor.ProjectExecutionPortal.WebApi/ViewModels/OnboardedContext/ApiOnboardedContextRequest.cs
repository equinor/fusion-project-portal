using Equinor.ProjectExecutionPortal.Application.Commands.OnboardedContexts.OnboardContext;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedContext
{
    public class ApiOnboardContextRequest
    {
        public string ExternalId { get; set; }
        public string Description { get; set; }

        public OnboardContextCommand ToCommand()
        {
            return new OnboardContextCommand(ExternalId, Description);
        }

        public class OnboardContextRequestValidator : AbstractValidator<ApiOnboardContextRequest>
        {
            public OnboardContextRequestValidator()
            {
                RuleFor(x => x.ExternalId)
                    .NotEmpty()
                    .NotContainScriptTag()
                    .WithMessage("External Id is required");

                RuleFor(x => x.Description)
                    .MaximumLength(Domain.Entities.OnboardedContext.TitleLengthMax)
                    .NotContainScriptTag();
            }
        }
    }
}
