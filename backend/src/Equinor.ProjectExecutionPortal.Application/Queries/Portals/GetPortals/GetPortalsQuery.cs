using AutoMapper;
using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Portals.GetPortals;

public class GetPortalsQuery : QueryBase<IList<PortalDto>>
{
    public class Handler : IRequestHandler<GetPortalsQuery, IList<PortalDto>>
    {
        private readonly IReadWriteContext _context;
        private readonly IMapper _mapper;

        public Handler(IReadWriteContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IList<PortalDto>> Handle(GetPortalsQuery request, CancellationToken cancellationToken)
        {
            var entities = await _context.Set<Domain.Entities.Portal>()
                .AsNoTracking()
                .Include(x => x.ContextTypes)
                .ToListAsync(cancellationToken);

            var portals = _mapper.Map<List<Domain.Entities.Portal>, List<PortalDto>>(entities);

            return portals;
        }
    }
}
