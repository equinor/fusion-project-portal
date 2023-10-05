using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedContexts;
using Fusion.Integration;

namespace Equinor.ProjectExecutionPortal.Application.Services.ContextService
{
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

        public async Task<IList<OnboardedContextDto>> EnrichContextsWithFusionContextData(IList<OnboardedContextDto> contexts, CancellationToken cancellationToken)
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
    }
}
