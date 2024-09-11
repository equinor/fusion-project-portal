using AutoMapper;
using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApps;
using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Portals.GetPortalOnboardedApps;

public class GetPortalOnboardedAppsQuery(Guid portalId) : QueryBase<IList<PortalOnboardedAppDto?>>
{
    public Guid PortalId { get; } = portalId;

    public class Handler : IRequestHandler<GetPortalOnboardedAppsQuery, IList<PortalOnboardedAppDto?>>
    {
        private readonly IReadWriteContext _readWriteContext;
        private readonly IAppService _appService;
        private readonly IMapper _mapper;

        public Handler(IReadWriteContext readWriteContext, IAppService appService, IMapper mapper)
        {
            _readWriteContext = readWriteContext;
            _appService = appService;
            _mapper = mapper;
        }

        public async Task<IList<PortalOnboardedAppDto?>> Handle(GetPortalOnboardedAppsQuery request, CancellationToken cancellationToken)
        {
            var portal = await _readWriteContext.Set<Portal>()
                .AsNoTracking()
                .Include(portal => portal.ContextTypes)
                .Include(portal => portal.Apps)
                .ThenInclude(portalApp => portalApp.OnboardedApp)
                .ThenInclude(app => app.ContextTypes)
                .FirstOrDefaultAsync(x => x.Id == request.PortalId, cancellationToken);

            if (portal == null)
            {
                return new List<PortalOnboardedAppDto?>();
            }

            var portalApps = portal.Apps.GroupBy(app => app.OnboardedApp.Id).Select(group => group.First()).ToList();
     
            var portalAppsDto = _mapper.Map<List<PortalApp>, List<PortalOnboardedAppDto>>(portalApps);

            await _appService.SetAppsAsActiveInPortal(portalAppsDto, cancellationToken);

            var onboardedApps = await _readWriteContext.Set<OnboardedApp>()
                .AsNoTracking()
                .Include(onboardedApp => onboardedApp.ContextTypes)
                .ToListAsync(cancellationToken);

            var onBoardedAppsNotActiveInPortal = portal.ContextTypes.Any() ? 
                onboardedApps
                    .Where(onboardedApp =>
                        portal.Apps.All(portalAppDto => portalAppDto.OnboardedApp.Id != onboardedApp.Id) &&
                        (onboardedApp.ContextTypes.Count == 0 ||
                         onboardedApp.ContextTypes.Any(m => portal.ContextTypes.Any(n => n.ContextTypeKey == m.ContextTypeKey))))
                    .ToList() : 
                onboardedApps
                    .Where(onboardedApp => portal.Apps.All(portalAppDto => portalAppDto.OnboardedApp.Id != onboardedApp.Id))
                    .ToList();

            portalAppsDto.AddRange(onBoardedAppsNotActiveInPortal.Select(onBoardedApp => new PortalOnboardedAppDto()
            {
                OnboardedApp = _mapper.Map<OnboardedApp, OnboardedAppDto>(onBoardedApp),
                IsActive = false
            }));
            
            portalAppsDto = portalAppsDto.OrderBy(x => x.OnboardedApp?.AppKey).ToList();

            await _appService.EnrichAppsWithAllFusionAppData(portalAppsDto.Select(portalAppDto => portalAppDto.OnboardedApp).OrderBy(x => x.AppKey).ToList(), cancellationToken);
            
            return portalAppsDto;
        }
    }
}
