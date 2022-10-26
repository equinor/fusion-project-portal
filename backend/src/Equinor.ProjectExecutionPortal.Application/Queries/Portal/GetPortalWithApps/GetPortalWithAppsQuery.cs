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
            // Temp POC: Seed db if no portals is found
            if (!await _context.Set<Domain.Entities.Portal>().AnyAsync(cancellationToken))
            {
                await TempMethodSeedDb(cancellationToken);
            }

            var enitity = await _context.Set<Domain.Entities.Portal>()
                .Include(portal => portal.WorkSurfaces.OrderBy(workSurface => workSurface.Order))
                    .ThenInclude(workSurface => workSurface.AppGroups.OrderBy(appGroup => appGroup.Order)).
                        ThenInclude(appGroup => appGroup.Applications.OrderBy(application => application.Order))
                .AsNoTracking()
                .FirstOrDefaultAsync(cancellationToken) ?? throw new NotFoundException();

            var portal = _mapper.Map<Domain.Entities.Portal, PortalDto>(enitity);

            var enrichedPortal = await _appService.EnrichPortalWithFusionAppData(portal, cancellationToken);

            return enrichedPortal;
        }

        // TEMP TEMP TEMP POC
        private async Task TempMethodSeedDb(CancellationToken cancellationToken)
        {
            var portal = new Domain.Entities.Portal("Project Execution Portal", "A test description");

            var workSurface1 = new Domain.Entities.WorkSurface("Early Phase", "< DG 3", "Here you can find all the tools that you need", 0);
            var workSurface2 = new Domain.Entities.WorkSurface("Project Execution", "DG 3 - DG 4", "Go to this phase to work with projects that are beyond DG3", 1);
            var workSurface3 = new Domain.Entities.WorkSurface("Another phase", "DG X", "Some other sub text", 2);

            portal.AddWorkSurface(workSurface1);
            portal.AddWorkSurface(workSurface2);
            portal.AddWorkSurface(workSurface3);

            await _context.Set<Domain.Entities.Portal>().AddAsync(portal, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            var collaborationAppGroup = new Domain.Entities.WorkSurfaceAppGroup("Collaboration", 0, "#E24973");
            var projectInformationAppGroup = new Domain.Entities.WorkSurfaceAppGroup("Project Information", 1, "#6D2FD5");
            var ccAppGroup = new Domain.Entities.WorkSurfaceAppGroup("Construction and Commissioning", 2, "#0084C4");
            var demoAppGroup = new Domain.Entities.WorkSurfaceAppGroup("Demo", 3, "#00977B");

            workSurface2.AddAppGroup(collaborationAppGroup);
            workSurface2.AddAppGroup(projectInformationAppGroup);
            workSurface2.AddAppGroup(ccAppGroup);
            workSurface2.AddAppGroup(demoAppGroup);

            await _context.SaveChangesAsync(cancellationToken);

            var meetingsApp = new Domain.Entities.WorkSurfaceApplication("meetings", null, 0, workSurface2.Id);
            var reviewsApp = new Domain.Entities.WorkSurfaceApplication("reviews", null, 1, workSurface2.Id);
            var tasksApp = new Domain.Entities.WorkSurfaceApplication("tasks", null, 0, workSurface2.Id);
            var orgChartApp = new Domain.Entities.WorkSurfaceApplication("one-equinor", null, 1, workSurface2.Id);
            var handoverGardenApp = new Domain.Entities.WorkSurfaceApplication("handover-garden", null, 0, workSurface2.Id);
            var workOrderGardenApp = new Domain.Entities.WorkSurfaceApplication("workorder-garden", null, 1, workSurface2.Id);
            var demoApp = new Domain.Entities.WorkSurfaceApplication("test-app", null, 0, workSurface2.Id);

            collaborationAppGroup.AddApplication(meetingsApp);
            collaborationAppGroup.AddApplication(reviewsApp);
            projectInformationAppGroup.AddApplication(tasksApp);
            projectInformationAppGroup.AddApplication(orgChartApp);
            ccAppGroup.AddApplication(handoverGardenApp);
            ccAppGroup.AddApplication(workOrderGardenApp);
            demoAppGroup.AddApplication(demoApp);

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
