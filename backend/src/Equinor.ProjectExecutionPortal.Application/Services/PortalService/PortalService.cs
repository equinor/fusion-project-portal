using AutoMapper;
using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApps;
using Equinor.ProjectExecutionPortal.Application.Queries.Portals;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Services.PortalService;

public class PortalService : IPortalService
{
    private readonly IMapper _mapper;
    private readonly IReadWriteContext _context;

    public PortalService(IMapper mapper, IReadWriteContext context)
    {
        _mapper = mapper;
        _context = context;
    }

    public IList<PortalOnboardedAppDto> CombinePortalAppsWithOnboardedApps(Portal portal, IList<OnboardedApp> onboardedApps, CancellationToken cancellationToken)
    {
        var portalAppsDto = _mapper.Map<List<PortalApp>, List<PortalOnboardedAppDto>>(GetDistinctPortalApps(portal.Apps.ToList()));

        SetAppsAsActiveInPortal(portalAppsDto);

        var onBoardedAppsNotActiveInPortal = GetOnBoardedAppsNotActiveInPortal(portal, onboardedApps);

        portalAppsDto.AddRange(onBoardedAppsNotActiveInPortal);

        return portalAppsDto.OrderBy(x => x.OnboardedApp.AppKey).ToList();
    }

    public async Task<PortalOnboardedAppDto> EnrichPortalAppWithContextIds(PortalOnboardedAppDto portalOnboardedAppDto, IList<Guid> contextIds, CancellationToken cancellationToken)
    {
        portalOnboardedAppDto.ContextIds = contextIds.ToList();

        await Task.CompletedTask;

        return portalOnboardedAppDto;
    }

    public PortalOnboardedAppDto GetPortalOnboardedAppNotActive(OnboardedApp onboardedApp, CancellationToken cancellationToken)
    {
        return new PortalOnboardedAppDto { OnboardedApp = _mapper.Map<OnboardedApp, OnboardedAppDto>(onboardedApp), IsActive = false };
    }

    public async Task<PortalOnboardedAppDto> SetAppAsActiveInPortal(PortalOnboardedAppDto app, CancellationToken cancellationToken)
    {
        app.IsActive = true;

        await Task.CompletedTask;

        return app;
    }

    public async Task<bool> UserIsOwner(Guid portalId, Guid userId)
    {
        var isOwner = await _context.Set<Portal>()
            .Include(portal => portal.Owners)
            .ThenInclude(owner => owner.Account)
            .Where(portal => portal.Id == portalId)
            .AnyAsync(x => x.Owners.Any(o => o.Account.AzureUniqueId == userId));

        return isOwner;
    }

    public async Task<bool> UserIsAdmin(Guid portalId, Guid userId)
    {
        var isAdmin = await _context.Set<Portal>()
            .Include(portal => portal.Admins)
            .ThenInclude(admin => admin.Account)
            .Where(portal => portal.Id == portalId)
            .AnyAsync(x => x.Admins.Any(o => o.Account.AzureUniqueId == userId));

        return isAdmin;
    }

    private static void SetAppsAsActiveInPortal(IList<PortalOnboardedAppDto> apps)
    {
        foreach (var app in apps)
        {
            app.IsActive = true;
        }
    }

    private static List<PortalApp> GetDistinctPortalApps(List<PortalApp> portalApps)
    {
        var distinctPortalApps = portalApps.GroupBy(app => app.OnboardedApp.Id)
            .Select(group => group.First())
            .ToList();

        return distinctPortalApps;
    }

    private List<PortalOnboardedAppDto> GetOnBoardedAppsNotActiveInPortal(Portal portal, IList<OnboardedApp> onboardedApps)
    {
        var onBoardedAppsNotActiveInPortal = IsContextualPortal(portal)
            ? onboardedApps
                .Where(onboardedApp =>
                    portal.Apps.All(portalAppDto => portalAppDto.OnboardedApp.Id != onboardedApp.Id) &&
                    (onboardedApp.ContextTypes.Count == 0 ||
                     onboardedApp.ContextTypes.Any(m => portal.ContextTypes.Any(n => n.ContextTypeKey == m.ContextTypeKey))))
                .ToList()
            : onboardedApps
                .Where(onboardedApp => portal.Apps.All(portalAppDto => portalAppDto.OnboardedApp.Id != onboardedApp.Id))
                .ToList();

        return onBoardedAppsNotActiveInPortal.Select(onBoardedApp => new PortalOnboardedAppDto() { OnboardedApp = _mapper.Map<OnboardedApp, OnboardedAppDto>(onBoardedApp), IsActive = false })
            .ToList();
    }

    private static bool IsContextualPortal(Portal portal)
    {
        return portal.ContextTypes.Count > 0;
    }
}
