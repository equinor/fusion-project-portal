using Equinor.ProjectExecutionPortal.Application.Commands.OnboardedContexts.RemoveOnboardedContext;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedContext
{
    public class ApiRemoveOnboardedContextRequest
    {
        public Guid Id { get; init; }

        public RemoveOnboardedContextCommand ToCommand()
        {
            return new RemoveOnboardedContextCommand(Id);
        }

        public class RemoveOnboardedContextRequestValidator : AbstractValidator<ApiRemoveOnboardedContextRequest>
        {
            public RemoveOnboardedContextRequestValidator()
            {
                RuleFor(x => x.Id)
                    .NotEmpty()
                    .WithMessage("External Id is required");
            }
        }
    }
}
