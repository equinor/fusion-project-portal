using Equinor.ProjectExecutionPortal.Application.Commands.OnboardedContexts.RemoveOnboardedContext;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedContext
{
    public class ApiRemoveOnboardedContextRequest
    {
        public string ExternalId { get; set; }

        public RemoveOnboardedContextCommand ToCommand()
        {
            return new RemoveOnboardedContextCommand(ExternalId);
        }

        public class RemoveOnboardedContextRequestValidator : AbstractValidator<ApiRemoveOnboardedContextRequest>
        {
            public RemoveOnboardedContextRequestValidator()
            {
                RuleFor(x => x.ExternalId)
                    .NotEmpty()
                    .WithMessage("External Id is required");
            }
        }
    }
}
