using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.Application.Services.WorkSurfaceService;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface.GetWorkSurfaceAppGroupsWithGlobalApps;

public class GetWorkSurfaceAppGroupsWithGlobalAppsQuery : QueryBase<IList<WorkSurfaceAppGroupWithAppsDto>>
{
    public GetWorkSurfaceAppGroupsWithGlobalAppsQuery(Guid workSurfaceId)
    {
        WorkSurfaceId = workSurfaceId;
    }

    public Guid WorkSurfaceId { get; }

    public class Handler : IRequestHandler<GetWorkSurfaceAppGroupsWithGlobalAppsQuery, IList<WorkSurfaceAppGroupWithAppsDto>>
    {
        private readonly IReadWriteContext _readWriteContext;
        private readonly IAppService _appService;
        private readonly IWorkSurfaceService _workSurfaceService;

        public Handler(IReadWriteContext readWriteContext, IAppService appService, IWorkSurfaceService workSurfaceService)
        {
            _readWriteContext = readWriteContext;
            _appService = appService;
            _workSurfaceService = workSurfaceService;
        }

        public async Task<IList<WorkSurfaceAppGroupWithAppsDto>> Handle(GetWorkSurfaceAppGroupsWithGlobalAppsQuery request, CancellationToken cancellationToken)
        {
            var workSurface = await _readWriteContext.Set<Domain.Entities.WorkSurface>()
                .AsNoTracking()
                .Include(workSurface => workSurface.Apps.Where(app => app.OnboardedContextId == null))
                .ThenInclude(app => app.OnboardedApp)
                .ThenInclude(onboardedApp => onboardedApp.AppGroup)
                .OrderBy(appGroup => appGroup.Order).ThenBy(app => app.Order)
                .FirstOrDefaultAsync(x => x.Id == request.WorkSurfaceId, cancellationToken);

            if (workSurface == null)
            {
                throw new NotFoundException(nameof(WorkSurfaceApp), request.WorkSurfaceId);
            }

            var appGroupsWithApps = _workSurfaceService.MapWorkSurfaceToAppGroups(workSurface);

            await _appService.EnrichAppsWithFusionAppData(appGroupsWithApps.SelectMany(x => x.Apps).ToList(), cancellationToken);

            return appGroupsWithApps;
        }
    }
}
