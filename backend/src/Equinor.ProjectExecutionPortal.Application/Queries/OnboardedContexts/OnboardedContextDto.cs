using Equinor.ProjectExecutionPortal.Application.Infrastructure.Mappings;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Fusion.Integration;

namespace Equinor.ProjectExecutionPortal.Application.Queries.OnboardedContexts;

public class OnboardedContextDto : IMapFrom<OnboardedContext>
{
    public Guid Id { get; set; }
    public required string ExternalId { get; set; }
    public required string Type { get; set; }
    public Guid ContextId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }

    public void SupplyWithFusionData(FusionContext context)
    {
        Title = context.Title;
        ContextId = context.Id;
    }
}
