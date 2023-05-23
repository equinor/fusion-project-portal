using AutoMapper;
using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApp;
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

        /// <summary>
        /// Maps a WorkSurface to a grouping by AppGroups with respective destinct apps
        /// </summary>
        public List<WorkSurfaceAppGroupWithAppsDto> MapWorkSurfaceToAppGroups(WorkSurface workSurface)
        {
            var appGrouping = workSurface.Apps.GroupBy(x => new
            {
                x.OnboardedApp.AppGroup.Name,
                x.OnboardedApp.AppGroup.Order,
                x.OnboardedApp.AppGroup.AccentColor
            });

            return appGrouping.Select(grouping => new WorkSurfaceAppGroupWithAppsDto
            {
                Name = grouping.Key.Name,
                AccentColor = grouping.Key.AccentColor,
                Order = grouping.Key.Order,
                Apps = grouping
                    .DistinctBy(x => x.OnboardedAppId)
                    .Select(workSurfaceApp => new WorkSurfaceAppDto
                    {
                        OnboardedApp = _mapper.Map<OnboardedApp, OnboardedAppDto>(workSurfaceApp.OnboardedApp)
                    })
                    .OrderBy(surfaceAppDto => surfaceAppDto.OnboardedApp.Order)
                    .ToList()
            })
                .OrderBy(x => x.Order)
                .ToList();
        }
    }
}
