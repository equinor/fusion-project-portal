using AutoMapper;
using Equinor.ProjectExecutionPortal.Application.Services.ContextService;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.OnboardedContexts.GetOnboardedContext;

public class GetOnboardedContextByContextIdQuery : QueryBase<OnboardedContextDto?>
{
    public GetOnboardedContextByContextIdQuery(Guid contextId)
    {
        ContextId = contextId;
    }

    public Guid ContextId { get; }

    public class Handler : IRequestHandler<GetOnboardedContextByContextIdQuery, OnboardedContextDto?>
    {
        private readonly IReadWriteContext _readWriteContext;
        private readonly IMapper _mapper;
        private readonly IContextService _contextService;

        public Handler(IReadWriteContext readWriteContext, IMapper mapper, IContextService contextService)
        {
            _readWriteContext = readWriteContext;
            _mapper = mapper;
            _contextService = contextService;
        }

        public async Task<OnboardedContextDto?> Handle(GetOnboardedContextByContextIdQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var fusionContext = await _contextService.GetFusionContext(request.ContextId, cancellationToken);

                var entity = await _readWriteContext.Set<Domain.Entities.OnboardedContext>()
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.ExternalId == fusionContext.ExternalId && x.Type == fusionContext.Type.Name, cancellationToken);

                var onboardedContext = _mapper.Map<Domain.Entities.OnboardedContext?, OnboardedContextDto?>(entity);

                await _contextService.EnrichContextWithFusionContextData(onboardedContext, cancellationToken);

                return onboardedContext;
            }
            catch
            {
                return null;
            }

        }
    }
}
