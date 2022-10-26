using AutoMapper;
using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface.GetWorkSurface;

public class GetWorkSurfaceQuery : QueryBase<WorkSurfaceDto?>
{
    public GetWorkSurfaceQuery(Guid workSurfaceId)
    {
        WorkSurfaceId = workSurfaceId;
    }

    public Guid WorkSurfaceId { get; set; }

    public class Handler : IRequestHandler<GetWorkSurfaceQuery, WorkSurfaceDto?>
    {
        private readonly IReadWriteContext _context;
        private readonly IMapper _mapper;
        private readonly IAppService _appService;

        public Handler(IReadWriteContext context, IMapper mapper, IAppService appService)
        {
            _context = context;
            _mapper = mapper;
            _appService = appService;
        }

        public async Task<WorkSurfaceDto?> Handle(GetWorkSurfaceQuery request, CancellationToken cancellationToken)
        {
            var entity = await _context.Set<Domain.Entities.WorkSurface>()
                .AsNoTracking()
                .Include(workSurface => workSurface.AppGroups.OrderBy(appGroup => appGroup.Order))
                    .ThenInclude(appGroup => appGroup.Applications.OrderBy(x => x.Order))
                .FirstOrDefaultAsync(x => x.Id == request.WorkSurfaceId, cancellationToken) ?? throw new NotFoundException();

            var workSurface = _mapper.Map<Domain.Entities.WorkSurface, WorkSurfaceDto>(entity);

            var enrichedWorkSurface = await _appService.EnrichWorkSurfaceWithFusionAppData(workSurface, cancellationToken);

            return enrichedWorkSurface;
        }
    }
}
