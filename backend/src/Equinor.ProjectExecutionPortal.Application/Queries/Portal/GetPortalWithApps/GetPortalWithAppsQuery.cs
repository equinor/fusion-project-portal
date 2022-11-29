using AutoMapper;
using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Portal.GetPortalWithApps;

public class GetPortalWithAppsQuery : QueryBase<PortalDto?>
{
    public GetPortalWithAppsQuery()
    {
    }

    public class Handler : IRequestHandler<GetPortalWithAppsQuery, PortalDto?>
    {
        private readonly IReadWriteContext _context;
        private readonly IMapper _mapper;
        private readonly IAppService _appService;

        public Handler(IReadWriteContext context, IMapper mapper, IAppService appService)
        {
            _context = context;
            _mapper = mapper;
            _appService = appService;
        }

        public async Task<PortalDto?> Handle(GetPortalWithAppsQuery request, CancellationToken cancellationToken)
        {
            var enitity = await _context.Set<Domain.Entities.Portal>()
                .Include(portal => portal.WorkSurfaces.OrderBy(workSurface => workSurface.Order))
                    .ThenInclude(workSurface => workSurface.AppGroups.OrderBy(appGroup => appGroup.Order))
                        .ThenInclude(appGroup => appGroup.Apps.OrderBy(application => application.Order))
                            .ThenInclude(x => x.OnboardedApp)
                .AsNoTracking()
                .FirstOrDefaultAsync(cancellationToken) ?? throw new NotFoundException();

            var portal = _mapper.Map<Domain.Entities.Portal, PortalDto>(enitity);

            var enrichedPortal = await _appService.EnrichPortalWithFusionAppData(portal, cancellationToken);

            return enrichedPortal;
        }
    }
}
