using AutoMapper;
using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.Application.Services.WorkSurfaceService;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaces.GetWorkSurfaceAppGroupsWithGlobalApps;

public class GetWorkSurfaceAppGroupsWithGlobalAppsQuery : QueryBase<IList<WorkSurfaceAppGroupWithAppsDto>>
{
    public GetWorkSurfaceAppGroupsWithGlobalAppsQuery(Guid workSurfaceId)
    {
        WorkSurfaceId = workSurfaceId;
    }

    public Guid WorkSurfaceId { get; }

    public class Handler : IRequestHandler<GetWorkSurfaceAppGroupsWithGlobalAppsQuery, IList<WorkSurfaceAppGroupWithAppsDto>?>
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

        public async Task<IList<WorkSurfaceAppGroupWithAppsDto>?> Handle(GetWorkSurfaceAppGroupsWithGlobalAppsQuery request, CancellationToken cancellationToken)
        {
            var workSurface = await _readWriteContext.Set<Portal>()
                .AsNoTracking()
                .Include(workSurface => workSurface.Apps)
                .ThenInclude(workSurfaceApp => workSurfaceApp.OnboardedApp)
                .ThenInclude(onboardedApp => onboardedApp.AppGroup)
                .FirstOrDefaultAsync(x => x.Id == request.WorkSurfaceId, cancellationToken);

            if (workSurface == null)
            {
                return null;
            }

            var workSurfaceDto = _mapper.Map<Portal, WorkSurfaceDto>(workSurface);

            await _appService.EnrichAppsWithFusionAppData(workSurfaceDto.Apps.Select(workSurfaceAppDto => workSurfaceAppDto.OnboardedApp).ToList(), cancellationToken);

            var appGroupsWithApps = _workSurfaceService.MapWorkSurfaceToAppGroups(workSurfaceDto);

            return appGroupsWithApps;
        }
    }
}
