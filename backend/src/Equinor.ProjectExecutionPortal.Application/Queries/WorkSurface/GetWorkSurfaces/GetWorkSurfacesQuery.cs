using AutoMapper;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface.GetWorkSurfaces;

public class GetWorkSurfacesQuery : QueryBase<IList<WorkSurfaceDto>>
{
    public GetWorkSurfacesQuery()
    {
    }

    public class Handler : IRequestHandler<GetWorkSurfacesQuery, IList<WorkSurfaceDto>>
    {
        private readonly IReadWriteContext _context;
        private readonly IMapper _mapper;

        public Handler(IReadWriteContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IList<WorkSurfaceDto>> Handle(GetWorkSurfacesQuery request, CancellationToken cancellationToken)
        {
            var entities = await _context.Set<Domain.Entities.WorkSurface>()
                .OrderBy(x => x.Order)
                .AsNoTracking().ToListAsync(cancellationToken);

            var workSurfaces = _mapper.Map<List<Domain.Entities.WorkSurface>, List<WorkSurfaceDto>>(entities);

            // This causes projection to lazy load
            //var entities = await _context.Set<Domain.Entities.WorkSurface>()
            //    .AsNoTracking()
            //    .ProjectToListAsync<WorkSurfaceDto>(_mapper.ConfigurationProvider);

            return workSurfaces;
        }
    }
}
