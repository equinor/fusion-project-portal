using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface;
using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaceAppGroup;
using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaceApplication;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using MediatR;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Portal.GetPortalWithApps;

public class GetPortalWithAppsQuery : QueryBase<PortalDto?>
{
    public GetPortalWithAppsQuery()
    {
    }

    public class Handler : IRequestHandler<GetPortalWithAppsQuery, PortalDto?>
    {
        //private readonly IReadWriteContext _context;

        public Handler()
        {
            // _context = context;
        }

        public async Task<PortalDto?> Handle(GetPortalWithAppsQuery request, CancellationToken cancellationToken)
        {
            // As of now, we should only have one portal

            //var portal = await _context.Set<Domain.Entities.Portal>()
            //    .Include(x => x.WorkSurfaces).ThenInclude(x => x.Applications)
            //    .AsNoTracking()
            //    .FirstOrDefaultAsync(cancellationToken) ?? throw new NotFoundException("Could not find any portals");
            //.ProjectToListAsync<PortalAppDto>(_mapper.ConfigurationProvider);

            return new PortalDto
            {
                Name = "Project Execution Portal",
                Description = "A test description",
                WorkSurfaces = new List<WorkSurfaceDto>
                {
                    new WorkSurfaceDto
                    {
                        Name = "Early Phase",
                        ShortName = "< DG 3",
                        SubText = "Here you can find all the tools that you need",
                        Order = 0,
                        AppGroups =new List<WorkSurfaceAppGroupDto>(),
                        Applications = new List<WorkSurfaceApplicationDto>
                        {
                            new WorkSurfaceApplicationDto
                            {
                                Name = "One Equinor",
                                AppKey = "one-equinor",
                                Order = 0
                            },
                            new WorkSurfaceApplicationDto
                            {
                                Name = "Resource Allocation Landingpage",
                                AppKey = "resource-allocation-landingpage",
                                Order = 1
                            }
                        }
                    },
                    new WorkSurfaceDto
                    {
                        Name = "Project Execution",
                        ShortName = "DG 3 - DG 4",
                        SubText = "Go to this phase to work with projects that are beyond DG3",
                        Order = 1,
                        AppGroups =new List<WorkSurfaceAppGroupDto>(),
                        Applications = new List<WorkSurfaceApplicationDto>
                        {
                            new WorkSurfaceApplicationDto
                            {
                                Name = "One Equinor",
                                AppKey = "one-equinor",
                                Order = 0
                            },
                            new WorkSurfaceApplicationDto
                            {
                                Name = "Resource Allocation Landingpage",
                                AppKey = "resource-allocation-landingpage",
                                Order = 1
                            }
                        }
                    },
                    new WorkSurfaceDto
                    {
                        Name = "Another phase",
                        ShortName = "DG X",
                        SubText = "Some other sub text",
                        Order = 2,
                        AppGroups =new List<WorkSurfaceAppGroupDto>(),
                        Applications = new List<WorkSurfaceApplicationDto>
                        {
                            new WorkSurfaceApplicationDto
                            {
                                Name = "One Equinor",
                                AppKey = "one-equinor",
                                Order = 0
                            },
                            new WorkSurfaceApplicationDto
                            {
                                Name = "Resource Allocation Landingpage",
                                AppKey = "resource-allocation-landingpage",
                                Order = 1
                            }
                        }
                    },
                }
            };
        }
    }
}
