using Equinor.ProjectExecutionPortal.Application.Infrastructure.Mappings;

namespace Equinor.ProjectExecutionPortal.Application.Queries.ContextTypes;

public class ContextTypeDto : IMapFrom<Domain.Entities.ContextType>
{
    public required string ContextTypeKey { get; set; }
}
