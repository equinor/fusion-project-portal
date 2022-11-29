using AutoMapper;
using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaceAppGroup;
using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface.GetWorkSurfaceApps;

public class GetWorkSurfaceAppGroupsWithAppsQuery : QueryBase<IList<WorkSurfaceAppGroupDto>>
{
    public GetWorkSurfaceAppGroupsWithAppsQuery(Guid workSurfaceId, string? contextExternalId)
    {
        WorkSurfaceId = workSurfaceId;
        ContextExternalId = contextExternalId;
    }

    public Guid WorkSurfaceId { get; }
    public string? ContextExternalId { get; }

    public class Handler : IRequestHandler<GetWorkSurfaceAppGroupsWithAppsQuery, IList<WorkSurfaceAppGroupDto>>
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

        public async Task<IList<WorkSurfaceAppGroupDto>> Handle(GetWorkSurfaceAppGroupsWithAppsQuery request, CancellationToken cancellationToken)
        {
            List<Domain.Entities.WorkSurfaceAppGroup> entities;

            if (request.ContextExternalId != null)
            {
                entities = await GetAppGroupsWithGlobalAndContextApps(request.WorkSurfaceId, request.ContextExternalId, cancellationToken);
            }
            else
            {
                entities = await GetAppGroupsWithGlobalApps(request.WorkSurfaceId, cancellationToken);
            }

            if (entities == null)
            {
                throw new NotFoundException(nameof(WorkSurfaceApp), request.WorkSurfaceId);
            }

            var appGroups = _mapper.Map<List<Domain.Entities.WorkSurfaceAppGroup>, List<WorkSurfaceAppGroupDto>>(entities);

            await _appService.EnrichAppsWithFusionAppData(appGroups.SelectMany(x => x.Apps).ToList(), cancellationToken);

            return appGroups;
        }

        private async Task<List<Domain.Entities.WorkSurfaceAppGroup>> GetAppGroupsWithGlobalApps(Guid workSurfaceId, CancellationToken cancellationToken)
        {
            var appGroups = await _readWriteContext.Set<Domain.Entities.WorkSurfaceAppGroup>()
                .AsNoTracking()
                .Include(appGroup => appGroup.Apps.Where(app => app.WorkSurfaceId == workSurfaceId && app.ExternalId == null))
                .ThenInclude(app => app.OnboardedApp)
                .OrderBy(appGroup => appGroup.Order)
                .ToListAsync(cancellationToken);

            return appGroups;
        }

        private async Task<List<Domain.Entities.WorkSurfaceAppGroup>> GetAppGroupsWithGlobalAndContextApps(Guid workSurfaceId, string contextExternalId, CancellationToken cancellationToken)
        {
            var appGroups = await _readWriteContext.Set<Domain.Entities.WorkSurfaceAppGroup>()
                .AsNoTracking()
                .Include(appGroup => appGroup.Apps.Where(app => app.WorkSurfaceId == workSurfaceId && (app.ExternalId == null || app.ExternalId == contextExternalId)))
                .ThenInclude(app => app.OnboardedApp)
                .OrderBy(appGroup => appGroup.Order)
                .ToListAsync(cancellationToken);

            return appGroups;
        }
    }
}
