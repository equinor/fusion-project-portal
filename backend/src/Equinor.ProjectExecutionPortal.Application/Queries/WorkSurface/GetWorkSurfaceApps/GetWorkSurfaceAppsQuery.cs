using AutoMapper;
using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface.GetWorkSurfaceApps;

public class GetWorkSurfaceAppsQuery : QueryBase<IList<WorkSurfaceAppDto>>
{
    public GetWorkSurfaceAppsQuery(Guid workSurfaceId, string? contextExternalId)
    {
        WorkSurfaceId = workSurfaceId;
        ContextExternalId = contextExternalId;
    }

    public Guid WorkSurfaceId { get; }
    public string? ContextExternalId { get; }

    public class Handler : IRequestHandler<GetWorkSurfaceAppsQuery, IList<WorkSurfaceAppDto>>
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

        public async Task<IList<WorkSurfaceAppDto>> Handle(GetWorkSurfaceAppsQuery request, CancellationToken cancellationToken)
        {
            Domain.Entities.WorkSurface? workSurface;

            if (request.ContextExternalId != null)
            {
                workSurface = await GetGlobalAndContextAppsForWorkSurface(request.WorkSurfaceId, request.ContextExternalId, cancellationToken);
            }
            else
            {
                workSurface = await GetGlobalAppsForWorkSurface(request.WorkSurfaceId, cancellationToken);
            }

            if (workSurface == null)
            {
                throw new NotFoundException(nameof(WorkSurfaceApp), request.WorkSurfaceId);
            }

            // TODO: Group by AppGroup and return list of AppGroups

            var test = workSurface.Apps.GroupBy(x => x.OnboardedApp.AppGroup.Name);

            var surfaceApps = _mapper.Map<List<Domain.Entities.WorkSurfaceApp>, List<WorkSurfaceAppDto>>(workSurface.Apps.ToList());

            await _appService.EnrichAppsWithFusionAppData(surfaceApps.ToList(), cancellationToken);

            return surfaceApps;
        }

        private Task<Domain.Entities.WorkSurface?> GetGlobalAppsForWorkSurface(Guid workSurfaceId, CancellationToken cancellationToken)
        {
            return _readWriteContext.Set<Domain.Entities.WorkSurface>()
                .AsNoTracking()
                .Include(workSurface => workSurface.Apps.Where(app => app.ExternalId == null))
                .ThenInclude(app => app.OnboardedApp)
                .ThenInclude(onboardedApp => onboardedApp.AppGroup)
                .OrderBy(appGroup => appGroup.Order)
                .FirstOrDefaultAsync(x => x.Id == workSurfaceId, cancellationToken);
        }

        private Task<Domain.Entities.WorkSurface?> GetGlobalAndContextAppsForWorkSurface(Guid workSurfaceId, string contextExternalId, CancellationToken cancellationToken)
        {
            return _readWriteContext.Set<Domain.Entities.WorkSurface>()
                .AsNoTracking()
                .Include(appGroup => appGroup.Apps.Where(app => app.ExternalId == null || app.ExternalId == contextExternalId))
                .ThenInclude(app => app.OnboardedApp)
                .ThenInclude(onboardedApp => onboardedApp.AppGroup)
                .OrderBy(appGroup => appGroup.Order)
                .FirstOrDefaultAsync(x => x.Id == workSurfaceId, cancellationToken);
        }
    }
}
