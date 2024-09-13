using AutoMapper;
using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.Application.Services.ContextService;
using Equinor.ProjectExecutionPortal.Application.Services.PortalService;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Portals.GetPortalOnboardedApp;

public class GetPortalOnboardedAppQuery(Guid portalId, string appKey) : QueryBase<PortalOnboardedAppDto?>
{
    public Guid PortalId { get; } = portalId;
    public string AppKey { get; } = appKey;

    public class Handler : IRequestHandler<GetPortalOnboardedAppQuery, PortalOnboardedAppDto?>
    {
        private readonly IReadWriteContext _readWriteContext;
        private readonly IAppService _appService;
        private readonly IPortalService _portalService;
        private readonly IContextService _contextService;
        private readonly IMapper _mapper;

        public Handler(IReadWriteContext readWriteContext, IAppService appService, IPortalService portalService, IContextService contextService, IMapper mapper)
        {
            _readWriteContext = readWriteContext;
            _appService = appService;
            _portalService = portalService;
            _contextService = contextService;
            _mapper = mapper;
        }

        public async Task<PortalOnboardedAppDto?> Handle(GetPortalOnboardedAppQuery request, CancellationToken cancellationToken)
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
                return null;
            }

            var portalApps = portal.Apps.Where(app => app.OnboardedApp.AppKey == request.AppKey).ToList();

            if (portalApps.Any()){
                
                var onboardedContexts = await _readWriteContext.Set<OnboardedContext>()
                    .AsNoTracking()
                    .ToListAsync(cancellationToken);
                
                var portalContextIds = await _contextService.GetFusionContextIds(onboardedContexts.Where(context => portalApps.Any(app => app.OnboardedContextId == context.Id)).ToList(), cancellationToken);
                
                var portalOnboardedAppDto = _mapper.Map<PortalApp, PortalOnboardedAppDto>(portalApps.First());

                await _portalService.EnrichPortalAppWithContextIds(portalOnboardedAppDto, portalContextIds, cancellationToken);

                await _portalService.SetAppAsActiveInPortal(portalOnboardedAppDto, cancellationToken);

                await _appService.EnrichAppWithFusionAppData(portalOnboardedAppDto.OnboardedApp, cancellationToken);

                return portalOnboardedAppDto;
            }

            var onboardedApp = await _readWriteContext.Set<OnboardedApp>()
                .AsNoTracking()
                .Include(onboardedApp => onboardedApp.ContextTypes)
                .FirstOrDefaultAsync(x => x.AppKey == request.AppKey, cancellationToken);

            if (onboardedApp != null)
            {
                var portalOnboardedAppNotActive = await _portalService.GetPortalOnboardedAppNotActive(onboardedApp, cancellationToken);

                await _appService.EnrichAppWithFusionAppData(portalOnboardedAppNotActive.OnboardedApp, cancellationToken);

                return portalOnboardedAppNotActive;
            }

            return null;
        }
            
    }
}
