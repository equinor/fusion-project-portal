using Equinor.ProjectExecutionPortal.Application.Commands.OnboardedContexts.UpdateOnboardedContext;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedContext
{
    public class ApiUpdateOnboardedContextRequest
    {
        public string? Description { get; set; }

        public UpdateOnboardedContextCommand ToCommand(string externalId)
        {
            return new UpdateOnboardedContextCommand(externalId, Description);
        }

        public class UpdateOnboardedContextRequestValidator : AbstractValidator<ApiUpdateOnboardedContextRequest>
        {
            public UpdateOnboardedContextRequestValidator()
            {
                RuleFor(x => x.Description)
                    .MaximumLength(Domain.Entities.OnboardedContext.DescriptionLengthMax)
                    .NotContainScriptTag();
            }
        }
    }
}
