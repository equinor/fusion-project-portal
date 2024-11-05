using Equinor.ProjectExecutionPortal.Application.Commands.OnboardedContexts.UpdateOnboardedContext;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedContext;

public class ApiUpdateOnboardedContextRequest
{
    public string? Description { get; set; }

    public UpdateOnboardedContextCommand ToCommand(Guid id)
    {
        return new UpdateOnboardedContextCommand(id, Description);
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