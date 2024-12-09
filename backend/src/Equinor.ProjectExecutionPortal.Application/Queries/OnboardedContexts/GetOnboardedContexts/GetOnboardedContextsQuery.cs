using AutoMapper;
using Equinor.ProjectExecutionPortal.Application.Services.ContextService;
using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.OnboardedContexts.GetOnboardedContexts;

public class GetOnboardedContextsQuery : QueryBase<List<OnboardedContextDto>>
{
    public class Handler : IRequestHandler<GetOnboardedContextsQuery, List<OnboardedContextDto>>
    {
        private readonly IReadWriteContext _context;
        private readonly IMapper _mapper;
        private readonly IContextService _contextService;

        public Handler(IReadWriteContext context, IMapper mapper, IContextService contextService)
        {
            _context = context;
            _mapper = mapper;
            _contextService = contextService;
        }

        public async Task<List<OnboardedContextDto>> Handle(GetOnboardedContextsQuery request, CancellationToken cancellationToken)
        {
            var entity = await _context.Set<Domain.Entities.OnboardedContext>()
                .AsNoTracking()
            .ToListAsync(cancellationToken);

            var onboardedContext =  _mapper.Map<List<Domain.Entities.OnboardedContext>, List<OnboardedContextDto>>(entity);

            await _contextService.EnrichContextsWithFusionContextData(onboardedContext, cancellationToken);

            return onboardedContext;

        }
    }
}
