using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedContexts;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Fusion.Integration;

namespace Equinor.ProjectExecutionPortal.Application.Services.ContextService;

public class ContextService : IContextService
{
    private readonly IFusionContextResolver _fusionContextResolver;
        
    public ContextService(IFusionContextResolver contextResolver)
    {
        _fusionContextResolver = contextResolver;
    }

    public async Task<OnboardedContextDto> EnrichContextWithFusionContextData(OnboardedContextDto context, CancellationToken cancellationToken)
    {
        var contextIdentifier = ContextIdentifier.FromExternalId(context.ExternalId);
        var fusionContext = await _fusionContextResolver.ResolveContextAsync(contextIdentifier);

        if (fusionContext != null)
        {
            context.SupplyWithFusionData(fusionContext);
        }

        return context;
    }

    public async Task<List<OnboardedContextDto>> EnrichContextsWithFusionContextData(List<OnboardedContextDto> contexts, CancellationToken cancellationToken)
    {
        foreach (var onboardedContextDto in contexts)
        {
            var contextIdentifier = ContextIdentifier.FromExternalId(onboardedContextDto.ExternalId);
            var fusionContext = await _fusionContextResolver.ResolveContextAsync(contextIdentifier);

            if (fusionContext != null)
            {
                onboardedContextDto.SupplyWithFusionData(fusionContext);
            }
        }

        return contexts;
    }

    public async Task<FusionContext> GetFusionContext(Guid contextId, CancellationToken cancellation)
    {
        var context = await _fusionContextResolver.GetContextAsync(contextId);
   
        return context;
    }

    public async Task<List<Guid>> GetFusionContextIds(List<OnboardedContext> contexts, CancellationToken cancellationToken)
    {
        var contextIds = new List<Guid>();

        foreach (var context in contexts)
        {
            var contextIdentifier = ContextIdentifier.FromExternalId(context.ExternalId);
            var fusionContext = await _fusionContextResolver.ResolveContextAsync(contextIdentifier);

            if (fusionContext != null)
            {
                contextIds.Add(fusionContext.Id);
            }
        }

        return contextIds;
    }
}
