using AutoMapper;
using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.Application.Services.PortalService;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Portals.GetPortalAppGroupsWithContextAndGlobalApps;

public class GetPortalAppGroupsWithContextAndGlobalAppsQuery : QueryBase<IList<PortalAppGroupWithAppsDto>?>
{
    public GetPortalAppGroupsWithContextAndGlobalAppsQuery(Guid portalId, string? contextExternalId, string? contextType)
    {
        PortalId = portalId;
        ContextExternalId = contextExternalId;
        ContextType = contextType;
    }

    public Guid PortalId { get; }
    public string? ContextExternalId { get; }
    public string? ContextType { get; }

    public class Handler : IRequestHandler<GetPortalAppGroupsWithContextAndGlobalAppsQuery, IList<PortalAppGroupWithAppsDto>?>
    {
        private readonly IReadWriteContext _readWriteContext;
        private readonly IAppService _appService;
        private readonly IPortalService _portalService;
        private readonly IMapper _mapper;

        public Handler(IReadWriteContext readWriteContext, IAppService appService, IPortalService portalService, IMapper mapper)
        {
            _readWriteContext = readWriteContext;
            _appService = appService;
            _portalService = portalService;
            _mapper = mapper;
        }

        public async Task<IList<PortalAppGroupWithAppsDto>?> Handle(GetPortalAppGroupsWithContextAndGlobalAppsQuery request, CancellationToken cancellationToken)
        {
            var portal = await _readWriteContext.Set<Portal>()
                .AsNoTracking()
                .Include(portal => portal.Apps.Where(app => app.OnboardedContext == null || 
                                                                      (app.OnboardedContext.ExternalId == request.ContextExternalId && app.OnboardedContext.Type == request.ContextType)))
                .ThenInclude(app => app.OnboardedApp)
                .ThenInclude(onboardedApp => onboardedApp.AppGroup)
                .FirstOrDefaultAsync(x => x.Id == request.PortalId, cancellationToken);

            if (portal == null)
            {
                return null;
            }

            var portalDto = _mapper.Map<Portal, PortalDto>(portal);

            await _appService.EnrichAppsWithFusionAppData(portalDto.Apps.Select(portalAppDto => portalAppDto.OnboardedApp).ToList(), cancellationToken);

            var appGroupsWithApps = _portalService.MapPortalToAppGroups(portalDto);

            return appGroupsWithApps;
        }
    }
}
