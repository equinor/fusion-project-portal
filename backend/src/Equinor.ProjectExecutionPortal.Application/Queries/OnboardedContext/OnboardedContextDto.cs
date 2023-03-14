using Equinor.ProjectExecutionPortal.Application.Infrastructure.Mappings;
using Equinor.ProjectExecutionPortal.Domain.Entities;

public class OnboardedContextDto : IMapFrom<OnboardedContext>
{
    public string ExternalId { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
}
