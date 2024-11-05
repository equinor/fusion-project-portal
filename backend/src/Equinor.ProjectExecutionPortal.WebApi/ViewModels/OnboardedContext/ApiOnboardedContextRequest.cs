using Equinor.ProjectExecutionPortal.Application.Commands.OnboardedContexts.OnboardContext;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedContext
{
    public class ApiOnboardContextRequest
    {
        public required string ExternalId { get; init; } 
        public required string Type { get; init; } 
        public string? Description { get; init; }

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

                RuleFor(x => x.Type)
                    .NotEmpty()
                    .NotContainScriptTag()
                    .WithMessage("Context type is required");
            }
        }
    }
}
