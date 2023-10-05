using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedContexts;

namespace Equinor.ProjectExecutionPortal.Application.Services.ContextService
{
    public interface IContextService
    {
        Task<OnboardedContextDto> EnrichContextWithFusionContextData(OnboardedContextDto context, CancellationToken cancellationToken);
        Task<IList<OnboardedContextDto>> EnrichContextsWithFusionContextData(IList <OnboardedContextDto> contexts, CancellationToken cancellationToken);
    }
}
