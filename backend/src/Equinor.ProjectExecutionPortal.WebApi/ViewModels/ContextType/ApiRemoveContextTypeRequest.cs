using Equinor.ProjectExecutionPortal.Application.Commands.ContextTypes.RemoveContextType;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.ContextType
{
    public class ApiRemoveContextTypeRequest
    {
        public string Type { get; set; } = null!;

        public RemoveContextTypeCommand ToCommand()
        {
            return new RemoveContextTypeCommand(Type);
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
}
