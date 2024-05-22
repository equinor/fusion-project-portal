using AutoMapper;
using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.Application.Services.ContextService;
using Equinor.ProjectExecutionPortal.Application.Services.PortalService;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Portals.GetPortalAppGroupsWithContextAndGlobalApps;

public class GetPortalAppGroupsWithContextAndGlobalAppsByContextIdQuery : QueryBase<IList<PortalAppGroupWithAppsDto>?>
{
    
    public GetPortalAppGroupsWithContextAndGlobalAppsByContextIdQuery(Guid portalId, Guid contextId)
    {
        PortalId = portalId;
        ContextId = contextId;
    }

    public Guid PortalId { get; }
    public Guid ContextId { get; }

    public class Handler : IRequestHandler<GetPortalAppGroupsWithContextAndGlobalAppsByContextIdQuery, IList<PortalAppGroupWithAppsDto>?>
    {
        private readonly IReadWriteContext _readWriteContext;
        private readonly IAppService _appService;
        private readonly IPortalService _portalService;
        private readonly IMapper _mapper;
        private readonly IContextService _contextService;

        public Handler(IReadWriteContext readWriteContext, IAppService appService, IPortalService portalService, IMapper mapper, IContextService contextService)
        {
            _readWriteContext = readWriteContext;
            _appService = appService;
            _portalService = portalService;
            _mapper = mapper;
            _contextService = contextService;
        }

        public async Task<IList<PortalAppGroupWithAppsDto>?> Handle(GetPortalAppGroupsWithContextAndGlobalAppsByContextIdQuery request, CancellationToken cancellationToken)
        {
            var fusionContext = await _contextService.GetFusionContext(request.ContextId, cancellationToken);

            if (fusionContext == null)
            {
                throw new InvalidActionException($"Invalid context-id: {request.ContextId}");
            }

            var portal = await _readWriteContext.Set<Portal>()
                .AsNoTracking()
                .Include(portal => portal.Apps.Where(app => app.OnboardedContext == null ||
                                                                      (app.OnboardedContext.ExternalId == fusionContext.ExternalId && app.OnboardedContext.Type == fusionContext.Type.Name)))
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
