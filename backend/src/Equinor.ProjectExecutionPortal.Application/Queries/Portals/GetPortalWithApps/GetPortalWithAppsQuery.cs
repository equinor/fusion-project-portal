using AutoMapper;
using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Portals.GetPortalWithApps;

public class GetPortalWithAppsQuery : QueryBase<PortalDto?>
{
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
            var entity = await _context.Set<Domain.Entities.Portal>()
                .AsNoTracking()
                .Include(portal => portal.WorkSurfaces.OrderBy(workSurface => workSurface.Order))
                        .ThenInclude(appGroup => appGroup.Apps.OrderBy(application => application.OnboardedApp.Order))
                            .ThenInclude(x => x.OnboardedApp)
                                .ThenInclude(x => x.AppGroup)
                .FirstOrDefaultAsync(cancellationToken);

            if (entity == null)
            {
                return null;
            }

            var portal = _mapper.Map<Domain.Entities.Portal, PortalDto>(entity);

            await _appService.EnrichAppsWithFusionAppData(portal.WorkSurfaces.SelectMany(x => x.Apps.Select(y => y.OnboardedApp)).ToList(), cancellationToken);

            return portal;
        }
    }
}
