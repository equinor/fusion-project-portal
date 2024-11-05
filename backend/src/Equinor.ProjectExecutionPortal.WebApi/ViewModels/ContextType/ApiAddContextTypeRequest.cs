using Equinor.ProjectExecutionPortal.Application.Commands.ContextTypes.AddContextType;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.ContextType;

public class ApiAddContextTypeRequest
{
    public required string Type { get; init; }

    public AddContextTypeCommand ToCommand()
    {
        return new AddContextTypeCommand(Type);
    }

    public class ApiAddContextTypeRequestValidator : AbstractValidator<ApiAddContextTypeRequest>
    {
        public ApiAddContextTypeRequestValidator()
        {
            RuleFor(x => x.Type)
                .NotEmpty()
                .NotContainScriptTag()
                .WithMessage("Type required");
        }
    }
}
