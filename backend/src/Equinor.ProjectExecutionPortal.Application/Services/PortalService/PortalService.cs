using AutoMapper;
using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApps;
using Equinor.ProjectExecutionPortal.Application.Queries.Portals;
using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Application.Services.PortalService
{
    public class PortalService : IPortalService
    {   
        private readonly IMapper _mapper;

        public PortalService(IMapper mapper)
        {
            _mapper = mapper;
        }
        public async Task<IList<PortalOnboardedAppDto>> CombinePortalAppsWithOnboardedApps(Portal portal, IList<OnboardedApp> onboardedApps, CancellationToken cancellationToken)
        {

            var portalAppsDto = _mapper.Map<List<PortalApp>, List<PortalOnboardedAppDto>>(GetDistinctPortalApps(portal.Apps.ToList()));

            await SetAppsAsActiveInPortal(portalAppsDto, cancellationToken);

            var onBoardedAppsNotActiveInPortal = GetOnBoardedAppsNotActiveInPortal(portal, onboardedApps);

            portalAppsDto.AddRange(onBoardedAppsNotActiveInPortal);

            return portalAppsDto.OrderBy(x => x.OnboardedApp?.AppKey).ToList();

        }
        public async Task<PortalOnboardedAppDto> EnrichPortalAppWithContextIds(PortalOnboardedAppDto portalOnboardedAppDto, IList<Guid> contextIds, CancellationToken cancellationToken)
        {
            portalOnboardedAppDto.ContextIds = contextIds.ToList();

            await Task.CompletedTask;

            return portalOnboardedAppDto;
        }

        public async Task<PortalOnboardedAppDto> GetPortalOnboardedAppNotActive(OnboardedApp onboardedApp, CancellationToken cancellationToken)
        {
            return new PortalOnboardedAppDto()
            {
                OnboardedApp = _mapper.Map<OnboardedApp, OnboardedAppDto>(onboardedApp),
                IsActive = false
            };
        }

        public async Task<IList<PortalOnboardedAppDto>> SetAppsAsActiveInPortal(IList<PortalOnboardedAppDto> apps, CancellationToken cancellationToken)
        {
            foreach (var app in apps)
            {
                app.IsActive = true;
            }
            await Task.CompletedTask;
            return apps;
        }

        public async Task<PortalOnboardedAppDto> SetAppAsActiveInPortal(PortalOnboardedAppDto app, CancellationToken cancellationToken)
        {
            app.IsActive = true;
            
            await Task.CompletedTask;
            return app;
        }

        private List<PortalApp> GetDistinctPortalApps(List<PortalApp> portalApps)
        {
            var distinctPortalApps = portalApps.GroupBy(app => app.OnboardedApp.Id)
                .Select(group => group.First())
                .ToList();
            return distinctPortalApps;
        }

        private List<PortalOnboardedAppDto> GetOnBoardedAppsNotActiveInPortal(Portal portal, IList<OnboardedApp> onboardedApps)
        {
            var onBoardedAppsNotActiveInPortal = IsContextualPortal(portal) ?
                onboardedApps
                    .Where(onboardedApp =>
                        portal.Apps.All(portalAppDto => portalAppDto.OnboardedApp.Id != onboardedApp.Id) &&
                        (onboardedApp.ContextTypes.Count == 0 ||
                         onboardedApp.ContextTypes.Any(m => portal.ContextTypes.Any(n => n.ContextTypeKey == m.ContextTypeKey))))
                    .ToList() :
                onboardedApps
                    .Where(onboardedApp => portal.Apps.All(portalAppDto => portalAppDto.OnboardedApp.Id != onboardedApp.Id))
                    .ToList();

            return onBoardedAppsNotActiveInPortal.Select(onBoardedApp => new PortalOnboardedAppDto()
            {
                OnboardedApp = _mapper.Map<OnboardedApp, OnboardedAppDto>(onBoardedApp),
                IsActive = false
            }).ToList();
            
        }
        private bool IsContextualPortal(Portal portal)
        {
            return portal.ContextTypes.Count != 0;
        }
    }
}
