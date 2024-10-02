using AutoMapper;
using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Portals.GetPortalApps;

public class GetPortalAppsQuery : QueryBase<PortalDto?>
{
    public GetPortalAppsQuery(Guid portalId)
    {
        PortalId = portalId;
    }

    public Guid PortalId { get; }

    public class Handler : IRequestHandler<GetPortalAppsQuery, PortalDto?>
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

        public async Task<PortalDto?> Handle(GetPortalAppsQuery request, CancellationToken cancellationToken)
        {
            var portal = await _readWriteContext.Set<Portal>()
                .AsNoTracking()
                .Include(portal => portal.Apps)
                .ThenInclude(portalApp => portalApp.OnboardedApp)
                .ThenInclude(app => app.ContextTypes)
                .FirstOrDefaultAsync(x => x.Id == request.PortalId, cancellationToken);

            if (portal == null)
            {
                return null;
            }

            var portalDto = _mapper.Map<Portal, PortalDto>(portal);

            await _appService.EnrichWithFusionAppData(portalDto.Apps.Select(portalAppDto => portalAppDto.OnboardedApp).ToList(), cancellationToken);
            
            return portalDto;
        }
    }
}
