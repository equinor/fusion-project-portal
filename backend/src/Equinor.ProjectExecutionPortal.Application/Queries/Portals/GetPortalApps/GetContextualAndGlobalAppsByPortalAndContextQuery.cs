using AutoMapper;
using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.Application.Services.ContextService;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Portals.GetPortalApps;

public class GetContextualAndGlobalAppsByPortalAndContextQuery : QueryBase<IList<PortalAppDto>>
{
    public GetContextualAndGlobalAppsByPortalAndContextQuery(Guid portalId, Guid contextId)
    {
        PortalId = portalId;
        ContextId = contextId;
    }

    public Guid PortalId { get; }
    public Guid ContextId { get; }

    public class Handler : IRequestHandler<GetContextualAndGlobalAppsByPortalAndContextQuery, IList<PortalAppDto>>
    {
        private readonly IReadWriteContext _readWriteContext;
        private readonly IAppService _appService;
        private readonly IMapper _mapper;
        private readonly IContextService _contextService;

        public Handler(IReadWriteContext readWriteContext, IAppService appService, IMapper mapper, IContextService contextService)
        {
            _readWriteContext = readWriteContext;
            _appService = appService;
            _mapper = mapper;
            _contextService = contextService;
        }

        public async Task<IList<PortalAppDto>> Handle(GetContextualAndGlobalAppsByPortalAndContextQuery request, CancellationToken cancellationToken)
        {
            var fusionContext = await _contextService.GetFusionContext(request.ContextId, cancellationToken);

            if (fusionContext == null)
            {
                throw new NotFoundException($"Invalid context-id: {request.ContextId}");
            }

            var portal = await _readWriteContext.Set<Portal>()
                .AsNoTracking()
                .Include(portal => portal.Apps.Where(app => app.OnboardedContext == null || (app.OnboardedContext.ExternalId == fusionContext.ExternalId && app.OnboardedContext.Type == fusionContext.Type.Name)))
                .ThenInclude(app => app.OnboardedApp)
                .ThenInclude(app => app.ContextTypes)
                .FirstOrDefaultAsync(x => x.Id == request.PortalId, cancellationToken);

            if (portal == null)
            {
                throw new NotFoundException(nameof(Portal), request.PortalId);
            }

            var portalApps = portal.Apps.Where(apps => apps.OnboardedApp.ContextTypes.Count == 0 || apps.OnboardedApp.ContextTypes.Any(m => m.ContextTypeKey == fusionContext.Type.Name)).ToList();

            var portalAppsDto = _mapper.Map<List<PortalApp>, List<PortalAppDto>>(portalApps);

            await _appService.EnrichWithFusionAppData(portalAppsDto.Select(portalAppDto => portalAppDto.OnboardedApp).ToList(), cancellationToken);

            return portalAppsDto;
        }
    }
}
