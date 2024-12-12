using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedContexts;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Fusion.Integration;

namespace Equinor.ProjectExecutionPortal.Application.Services.ContextService;

public interface IContextService
{
    Task<OnboardedContextDto> EnrichContextWithFusionContextData(OnboardedContextDto context, CancellationToken cancellationToken);
    Task<List<OnboardedContextDto>> EnrichContextsWithFusionContextData(List <OnboardedContextDto> contexts, CancellationToken cancellationToken);
    Task<FusionContext> GetFusionContext(Guid  contextId, CancellationToken cancellationToken);
    Task<List<Guid>> GetFusionContextIds(List<OnboardedContext> contexts, CancellationToken cancellationToken);
}
