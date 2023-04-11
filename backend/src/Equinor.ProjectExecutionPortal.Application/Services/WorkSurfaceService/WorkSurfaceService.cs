using AutoMapper;
using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface;
using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Application.Services.WorkSurfaceService
{
    public class WorkSurfaceService : IWorkSurfaceService
    {
        private readonly IMapper _mapper;

        public WorkSurfaceService(IMapper mapper)
        {
            _mapper = mapper;
        }

        public List<WorkSurfaceAppGroupWithAppsDto> MapWorkSurfaceToAppGroups(WorkSurface workSurface)
        {
            var appGrouping = workSurface.Apps.GroupBy(x => new
            {
                x.OnboardedApp.AppGroup.Name,
                x.OnboardedApp.AppGroup.Order,
                x.OnboardedApp.AppGroup.AccentColor
            });

            return appGrouping.Select(x => new WorkSurfaceAppGroupWithAppsDto
            {
                Name = x.Key.Name,
                AccentColor = x.Key.AccentColor,
                Order = x.Key.Order,
                Apps = x.Select(y => _mapper.Map<WorkSurfaceApp, WorkSurfaceAppDto>(y)).ToList()
            })
                .OrderBy(x => x.Order)
                .ToList();
        }
    }
}
