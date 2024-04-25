using AutoMapper;
using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.Application.Services.WorkSurfaceService;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaces.GetWorkSurfaceAppGroupsWithContextAndGlobalApps;

public class GetWorkSurfaceAppGroupsWithContextAndGlobalAppsQuery : QueryBase<IList<WorkSurfaceAppGroupWithAppsDto>?>
{
    public GetWorkSurfaceAppGroupsWithContextAndGlobalAppsQuery(Guid workSurfaceId, string? contextExternalId, string? contextType)
    {
        WorkSurfaceId = workSurfaceId;
        ContextExternalId = contextExternalId;
        ContextType = contextType;
    }

    public Guid WorkSurfaceId { get; }
    public string? ContextExternalId { get; }
    public string? ContextType { get; }

    public class Handler : IRequestHandler<GetWorkSurfaceAppGroupsWithContextAndGlobalAppsQuery, IList<WorkSurfaceAppGroupWithAppsDto>?>
    {
        private readonly IReadWriteContext _readWriteContext;
        private readonly IAppService _appService;
        private readonly IWorkSurfaceService _workSurfaceService;
        private readonly IMapper _mapper;

        public Handler(IReadWriteContext readWriteContext, IAppService appService, IWorkSurfaceService workSurfaceService, IMapper mapper)
        {
            _readWriteContext = readWriteContext;
            _appService = appService;
            _workSurfaceService = workSurfaceService;
            _mapper = mapper;
        }

        public async Task<IList<WorkSurfaceAppGroupWithAppsDto>?> Handle(GetWorkSurfaceAppGroupsWithContextAndGlobalAppsQuery request, CancellationToken cancellationToken)
        {
            var workSurface = await _readWriteContext.Set<WorkSurface>()
                .AsNoTracking()
                .Include(workSurface => workSurface.Apps.Where(app => app.OnboardedContext == null || 
                                                                      (app.OnboardedContext.ExternalId == request.ContextExternalId && app.OnboardedContext.Type == request.ContextType)))
                .ThenInclude(app => app.OnboardedApp)
                .ThenInclude(onboardedApp => onboardedApp.AppGroup)
                .FirstOrDefaultAsync(x => x.Id == request.WorkSurfaceId, cancellationToken);

            if (workSurface == null)
            {
                return null;
            }

            var workSurfaceDto = _mapper.Map<WorkSurface, WorkSurfaceDto>(workSurface);

            await _appService.EnrichAppsWithFusionAppData(workSurfaceDto.Apps.Select(workSurfaceAppDto => workSurfaceAppDto.OnboardedApp).ToList(), cancellationToken);

            var appGroupsWithApps = _workSurfaceService.MapWorkSurfaceToAppGroups(workSurfaceDto);

            return appGroupsWithApps;
        }
    }
}
