using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedContexts;
using Fusion.Integration;

namespace Equinor.ProjectExecutionPortal.Application.Services.ContextService
{
    public interface IContextService
    {
        Task<OnboardedContextDto> EnrichContextWithFusionContextData(OnboardedContextDto context, CancellationToken cancellationToken);
        Task<IList<OnboardedContextDto>> EnrichContextsWithFusionContextData(IList <OnboardedContextDto> contexts, CancellationToken cancellationToken);
        Task<FusionContext> GetFusionContext(Guid  contextId, CancellationToken cancellationToken);
    }
}
