using AutoMapper;
using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface.GetWorkSurface;

public class GetWorkSurfaceWithAppsQuery : QueryBase<WorkSurfaceDto?>
{
    public GetWorkSurfaceWithAppsQuery(Guid workSurfaceId, string? contextExternalId)
    {
        WorkSurfaceId = workSurfaceId;
        ContextExternalId = contextExternalId;
    }

    public Guid WorkSurfaceId { get; }
    public string? ContextExternalId { get; }

    public class Handler : IRequestHandler<GetWorkSurfaceWithAppsQuery, WorkSurfaceDto?>
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

        public async Task<WorkSurfaceDto?> Handle(GetWorkSurfaceWithAppsQuery request, CancellationToken cancellationToken)
        {
            Domain.Entities.WorkSurface? entity;

            if (request.ContextExternalId != null)
            {
                entity = await GetWorkSurfaceWithContextApps(request.WorkSurfaceId, request.ContextExternalId, cancellationToken);
            }
            else
            {
                entity = await GetWorkSurfaceWithoutContextApps(request.WorkSurfaceId, cancellationToken);
            }

            if (entity == null)
            {
                throw new NotFoundException(nameof(WorkSurfaceApp), request.WorkSurfaceId);
            }

            var workSurface = _mapper.Map<Domain.Entities.WorkSurface, WorkSurfaceDto>(entity);

            var enrichedWorkSurface = await _appService.EnrichWorkSurfaceWithFusionAppData(workSurface, cancellationToken);

            return enrichedWorkSurface;
        }

        private async Task<Domain.Entities.WorkSurface> GetWorkSurfaceWithoutContextApps(Guid workSurfaceId, CancellationToken cancellationToken)
        {
            var entity = await _readWriteContext.Set<Domain.Entities.WorkSurface>()
                .AsNoTracking()
                .Include(workSurface => workSurface.AppGroups.OrderBy(appGroup => appGroup.Order))
                .ThenInclude(appGroup => appGroup.Apps.Where(x => x.ExternalId == null).OrderBy(x => x.Order))
                .ThenInclude(x => x.OnboardedApp)
                .FirstOrDefaultAsync(x => x.Id == workSurfaceId, cancellationToken) ?? throw new NotFoundException();

            return entity;
        }

        private async Task<Domain.Entities.WorkSurface> GetWorkSurfaceWithContextApps(Guid workSurfaceId, string contextExternalId, CancellationToken cancellationToken)
        {
            var entity = await _readWriteContext.Set<Domain.Entities.WorkSurface>()
                .AsNoTracking()
                .Include(workSurface => workSurface.AppGroups.OrderBy(appGroup => appGroup.Order))
                .ThenInclude(appGroup => appGroup.Apps.Where(x => x.ExternalId == null || x.ExternalId == contextExternalId).OrderBy(x => x.Order))
                .ThenInclude(x => x.OnboardedApp)
                .FirstOrDefaultAsync(x => x.Id == workSurfaceId, cancellationToken) ?? throw new NotFoundException();

            return entity;
        }
    }
}
