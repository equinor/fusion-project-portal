using Equinor.ProjectExecutionPortal.Application.Commands.OnboardedContexts.OnboardContext;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedContext
{
    public class ApiOnboardContextRequest
    {
        public string ExternalId { get; set; } = null!;
        public string? Description { get; set; }

        public OnboardContextCommand ToCommand(string externalId, string type)
        {
            return new OnboardContextCommand(externalId, type, Description);
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
