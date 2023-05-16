using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.Application.Services.WorkSurfaceService;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface.GetWorkSurfaceAppGroupsWithContextAndGlobalApps;

public class GetWorkSurfaceAppGroupsWithContextAndGlobalAppsQuery : QueryBase<IList<WorkSurfaceAppGroupWithAppsDto>>
{
    public GetWorkSurfaceAppGroupsWithContextAndGlobalAppsQuery(Guid workSurfaceId, string? contextExternalId)
    {
        WorkSurfaceId = workSurfaceId;
        ContextExternalId = contextExternalId;
    }

    public Guid WorkSurfaceId { get; }
    public string? ContextExternalId { get; }

    public class Handler : IRequestHandler<GetWorkSurfaceAppGroupsWithContextAndGlobalAppsQuery, IList<WorkSurfaceAppGroupWithAppsDto>>
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

        public async Task<IList<WorkSurfaceAppGroupWithAppsDto>> Handle(GetWorkSurfaceAppGroupsWithContextAndGlobalAppsQuery request, CancellationToken cancellationToken)
        {
            var workSurface = await _readWriteContext.Set<Domain.Entities.WorkSurface>()
                .AsNoTracking()
                .Include(appGroup => appGroup.Apps.Where(app => app.OnboardedContext == null || app.OnboardedContext.ExternalId == request.ContextExternalId))
                .ThenInclude(app => app.OnboardedApp)
                .ThenInclude(onboardedApp => onboardedApp.AppGroup)
                .OrderBy(appGroup => appGroup.Order).ThenBy(app => app.Order)
                .FirstOrDefaultAsync(x => x.Id == request.WorkSurfaceId, cancellationToken);

            if (workSurface == null)
            {
                throw new NotFoundException(nameof(WorkSurfaceApp), request.WorkSurfaceId);
            }

            var appGroupsWithApps = _workSurfaceService.MapWorkSurfaceToAppGroups(workSurface);

            await _appService.EnrichAppsWithFusionAppData(appGroupsWithApps.SelectMany(x => x.Apps.Select(y => y.OnboardedApp)).ToList(), cancellationToken);

            return appGroupsWithApps;
        }
    }
}
