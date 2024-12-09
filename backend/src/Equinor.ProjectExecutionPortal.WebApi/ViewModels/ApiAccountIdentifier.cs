using Equinor.ProjectExecutionPortal.Domain.Common;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels;

public class ApiAccountIdentifier
{
    public Guid AzureUniqueId { get; set; }

    public AccountIdentifier ToAccountIdentifier()
    {
        return new AccountIdentifier { AzureUniqueId = AzureUniqueId };
    }

    public class Validator : AbstractValidator<ApiAccountIdentifier>
    {
        public Validator()
        {
            RuleFor(x => x.AzureUniqueId)
                .NotEmpty();
        }
    }
}
