using AutoMapper;
using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface.GetWorkSurface;

public class GetWorkSurface : QueryBase<WorkSurfaceDto?>
{
    public GetWorkSurface(Guid workSurfaceId)
    {
        WorkSurfaceId = workSurfaceId;
    }

    public Guid WorkSurfaceId { get; }

    public class Handler : IRequestHandler<GetWorkSurface, WorkSurfaceDto?>
    {
        private readonly IReadWriteContext _readWriteContext;
        private readonly IMapper _mapper;
        private readonly IAppService _appService;

        public Handler(IReadWriteContext readWriteContext, IMapper mapper, IAppService appService)
        {
            _readWriteContext = readWriteContext;
            _mapper = mapper;
            _appService = appService;
        }

        public async Task<WorkSurfaceDto?> Handle(GetWorkSurface request, CancellationToken cancellationToken)
        {
            var entity = await _readWriteContext.Set<Domain.Entities.WorkSurface>()
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == request.WorkSurfaceId, cancellationToken) ?? throw new NotFoundException(nameof(WorkSurfaceApp), request.WorkSurfaceId);

            var workSurface = _mapper.Map<Domain.Entities.WorkSurface, WorkSurfaceDto>(entity);
            var enrichedWorkSurface = await _appService.EnrichWorkSurfaceWithFusionAppData(workSurface, cancellationToken);

            return enrichedWorkSurface;
        }
    }
}
