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
            Domain.Entities.WorkSurface? workSurface;

            if (request.ContextExternalId != null)
            {
                workSurface = await GetAppGroupsWithGlobalAndContextApps(request.WorkSurfaceId, request.ContextExternalId, cancellationToken);
            }
            else
            {
                workSurface = await GetAppGroupsWithGlobalApps(request.WorkSurfaceId, cancellationToken);
            }

            if (workSurface == null)
            {
                throw new NotFoundException(nameof(WorkSurfaceApp), request.WorkSurfaceId);
            }

            var appGroups = _mapper.Map<List<Domain.Entities.WorkSurfaceAppGroup>, List<WorkSurfaceAppGroupDto>>(workSurface.AppGroups.ToList());

            await _appService.EnrichAppsWithFusionAppData(appGroups.SelectMany(x => x.Apps).ToList(), cancellationToken);

            return appGroups;
        }

        private Task<Domain.Entities.WorkSurface?> GetAppGroupsWithGlobalApps(Guid workSurfaceId, CancellationToken cancellationToken)
        {
            return _readWriteContext.Set<Domain.Entities.WorkSurface>()
                .AsNoTracking()
                .Include(x => x.AppGroups)
                .ThenInclude(appGroup => appGroup.Apps.Where(app => app.ExternalId == null))
                .ThenInclude(app => app.OnboardedApp)
                .OrderBy(appGroup => appGroup.Order)
                .FirstOrDefaultAsync(x => x.Id == workSurfaceId, cancellationToken);
        }

        private Task<Domain.Entities.WorkSurface?> GetAppGroupsWithGlobalAndContextApps(Guid workSurfaceId, string contextExternalId, CancellationToken cancellationToken)
        {
            return _readWriteContext.Set<Domain.Entities.WorkSurface>()
                .AsNoTracking()
                .Include(x => x.AppGroups)
                .ThenInclude(appGroup => appGroup.Apps.Where(app => app.ExternalId == null || app.ExternalId == contextExternalId))
                .ThenInclude(app => app.OnboardedApp)
                .OrderBy(appGroup => appGroup.Order)
                .FirstOrDefaultAsync(x => x.Id == workSurfaceId, cancellationToken);
        }
    }
}
