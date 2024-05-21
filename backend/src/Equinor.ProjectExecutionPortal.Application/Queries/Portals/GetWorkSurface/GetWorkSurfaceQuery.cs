using AutoMapper;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaces.GetWorkSurface;

public class GetWorkSurfaceQuery : QueryBase<WorkSurfaceDto?>
{
    public GetWorkSurfaceQuery(Guid workSurfaceId)
    {
        WorkSurfaceId = workSurfaceId;
    }

    public Guid WorkSurfaceId { get; }

    public class Handler : IRequestHandler<GetWorkSurfaceQuery, WorkSurfaceDto?>
    {
        private readonly IReadWriteContext _readWriteContext;
        private readonly IMapper _mapper;

        public Handler(IReadWriteContext readWriteContext, IMapper mapper)
        {
            _readWriteContext = readWriteContext;
            _mapper = mapper;
        }

        public async Task<WorkSurfaceDto?> Handle(GetWorkSurfaceQuery request, CancellationToken cancellationToken)
        {
            var entity = await _readWriteContext.Set<Portal>()
            .AsNoTracking()
            .Include(x => x.ContextTypes)
            .FirstOrDefaultAsync(x => x.Id == request.WorkSurfaceId, cancellationToken);

            var workSurface = _mapper.Map<Portal?, WorkSurfaceDto?>(entity);

            return workSurface;
        }
    }
}
