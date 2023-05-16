using AutoMapper;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.OnboardedContext.GetOnboardedContexts;

public class GetOnboardedContextsQuery : QueryBase<IList<OnboardedContextDto>>
{
    public class Handler : IRequestHandler<GetOnboardedContextsQuery, IList<OnboardedContextDto>>
    {
        private readonly IReadWriteContext _context;
        private readonly IMapper _mapper;

        public Handler(IReadWriteContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IList<OnboardedContextDto>> Handle(GetOnboardedContextsQuery request, CancellationToken cancellationToken)
        {
            var enitity = await _context.Set<Domain.Entities.OnboardedContext>()
                .AsNoTracking()
                .ToListAsync(cancellationToken);

            return _mapper.Map<List<Domain.Entities.OnboardedContext>, List<OnboardedContextDto>>(enitity);
        }
    }
}
