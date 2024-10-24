using AutoMapper;
using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Portals.GetPortalApps;

public class GetGlobalAppsForPortalQuery : QueryBase<List<PortalAppDto>>
{
    public GetGlobalAppsForPortalQuery(Guid portalId)
    {
        PortalId = portalId;
    }

    public Guid PortalId { get; }

    public class Handler : IRequestHandler<GetGlobalAppsForPortalQuery, List<PortalAppDto>>
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

        public async Task<List<PortalAppDto>> Handle(GetGlobalAppsForPortalQuery request, CancellationToken cancellationToken)
        {
            var portalWithGlobalApps = await _readWriteContext.Set<Portal>()
                .AsNoTracking()
                .Include(portal => portal.Apps
                    .Where(app => app.OnboardedContext == null))
                    .ThenInclude(portalApp => portalApp.OnboardedApp)
                    .ThenInclude(app => app.ContextTypes)
                .FirstOrDefaultAsync(x => x.Id == request.PortalId, cancellationToken);

            if (portalWithGlobalApps == null)
            {
                throw new NotFoundException(nameof(Portal), request.PortalId);
            }

            var globalPortalApps = portalWithGlobalApps.Apps
                .DistinctBy(x => x.OnboardedApp.Id)
                .ToList();

            var globalPortalAppsDto = _mapper.Map<List<PortalApp>, List<PortalAppDto>>(globalPortalApps);

            await _appService.EnrichWithFusionAppData(globalPortalAppsDto.Select(portalAppDto => portalAppDto.OnboardedApp).ToList(), cancellationToken);

            return globalPortalAppsDto;
        }
    }
}
