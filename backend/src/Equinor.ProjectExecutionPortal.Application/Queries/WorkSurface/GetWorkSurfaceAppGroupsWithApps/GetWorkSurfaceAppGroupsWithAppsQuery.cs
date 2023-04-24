using AutoMapper;
using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApp;
using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface.GetWorkSurfaceAppGroupsWithApps;

public class GetWorkSurfaceAppGroupsWithAppsQuery : QueryBase<IList<WorkSurfaceAppGroupWithAppsDto>>
{
    public GetWorkSurfaceAppGroupsWithAppsQuery(Guid workSurfaceId, string? contextExternalId)
    {
        WorkSurfaceId = workSurfaceId;
        ContextExternalId = contextExternalId;
    }

    public Guid WorkSurfaceId { get; }
    public string? ContextExternalId { get; }

    public class Handler : IRequestHandler<GetWorkSurfaceAppGroupsWithAppsQuery, IList<WorkSurfaceAppGroupWithAppsDto>>
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

        public async Task<IList<WorkSurfaceAppGroupWithAppsDto>> Handle(GetWorkSurfaceAppGroupsWithAppsQuery request, CancellationToken cancellationToken)
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

            var appGroupsWithApps = MapWorkSurfaceToAppGroups(workSurface);

            await _appService.EnrichAppsWithFusionAppData(appGroupsWithApps.SelectMany(x => x.Apps).ToList(), cancellationToken);

            return appGroupsWithApps;
        }

        private Task<Domain.Entities.WorkSurface?> GetGlobalAppsForWorkSurface(Guid workSurfaceId, CancellationToken cancellationToken)
        {
            return _readWriteContext.Set<Domain.Entities.WorkSurface>()
                .AsNoTracking()
                .Include(workSurface => workSurface.Apps.Where(app => app.ExternalId == null))
                .ThenInclude(workSurfaceApp => workSurfaceApp.OnboardedApp)
                .ThenInclude(onboardedApp => onboardedApp.AppGroup)
                .OrderBy(workSurface => workSurface.Order)
                .FirstOrDefaultAsync(x => x.Id == workSurfaceId, cancellationToken);
        }

        private Task<Domain.Entities.WorkSurface?> GetGlobalAndContextAppsForWorkSurface(Guid workSurfaceId, string contextExternalId, CancellationToken cancellationToken)
        {
            return _readWriteContext.Set<Domain.Entities.WorkSurface>()
                .AsNoTracking()
                .Include(appGroup => appGroup.Apps.Where(app => app.ExternalId == null || app.ExternalId == contextExternalId))
                .ThenInclude(workSurfaceApp => workSurfaceApp.OnboardedApp)
                .ThenInclude(onboardedApp => onboardedApp.AppGroup)
                .OrderBy(workSurface => workSurface.Order)
                .FirstOrDefaultAsync(x => x.Id == workSurfaceId, cancellationToken);
        }

        private List<WorkSurfaceAppGroupWithAppsDto> MapWorkSurfaceToAppGroups(Domain.Entities.WorkSurface workSurface)
        {
            var appGrouping = workSurface.Apps.GroupBy(x => new
            {
                x.OnboardedApp.AppGroup.Name,
                x.OnboardedApp.AppGroup.Order,
                x.OnboardedApp.AppGroup.AccentColor
            });

            return appGrouping.Select(grouping => new WorkSurfaceAppGroupWithAppsDto
            {
                Name = grouping.Key.Name,
                AccentColor = grouping.Key.AccentColor,
                Order = grouping.Key.Order,
                Apps = grouping.Select(workSurfaceApp => new WorkSurfaceAppDto
                {
                    Order = workSurfaceApp.OnboardedApp.Order,
                    CreatedAtUtc = workSurfaceApp.CreatedAtUtc,
                    ModifiedAtUtc = workSurfaceApp.ModifiedAtUtc,
                    OnboardedApp = _mapper.Map<Domain.Entities.OnboardedApp, OnboardedAppDto>(workSurfaceApp.OnboardedApp),
                }).OrderBy(x => x.Order).ToList()
            })
                .OrderBy(x => x.Order)
                .ToList();
        }
    }
}
