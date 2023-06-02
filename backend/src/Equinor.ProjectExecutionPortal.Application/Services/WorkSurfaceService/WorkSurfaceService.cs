using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface;

namespace Equinor.ProjectExecutionPortal.Application.Services.WorkSurfaceService
{
    public class WorkSurfaceService : IWorkSurfaceService
    {
        public WorkSurfaceService()
        {
        }

        /// <summary>
        /// Maps a WorkSurface to an ordered grouping by AppGroups with respective destinct and ordered apps
        /// </summary>
        public List<WorkSurfaceAppGroupWithAppsDto> MapWorkSurfaceToAppGroups(WorkSurfaceDto workSurface)
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
                    .DistinctBy(workSurfaceAppDto => workSurfaceAppDto.OnboardedApp.Id)
                    .OrderBy(workSurfaceAppDto => workSurfaceAppDto.OnboardedApp.Name)
                    .ToList()
            })
                .OrderBy(x => x.Order)
                .ToList();
        }
    }
}
