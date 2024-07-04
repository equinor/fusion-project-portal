using AutoMapper;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.ContextTypes.GetContextTypes;

    public class GetContextTypesQuery : QueryBase<IList<ContextTypeDto>>
    {
        public GetContextTypesQuery()
        {
        }

        public class Handler : IRequestHandler<GetContextTypesQuery, IList<ContextTypeDto>>
        {
            private readonly IReadWriteContext _context;
            private readonly IMapper _mapper;

            public Handler(IReadWriteContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<IList<ContextTypeDto>> Handle(GetContextTypesQuery request,
                CancellationToken cancellationToken)
            {
                var entity = await _context.Set<Domain.Entities.ContextType>()
                    .AsNoTracking()
                    .ToListAsync(cancellationToken);

                var contextTypes = _mapper.Map<List<Domain.Entities.ContextType>, List<ContextTypeDto>>(entity);

                return contextTypes;
            }
        }

    }


