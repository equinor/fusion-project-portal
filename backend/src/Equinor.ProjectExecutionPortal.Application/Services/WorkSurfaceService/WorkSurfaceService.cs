using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaces;

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
            var appGrouping = workSurface.Apps.GroupBy(workSurfaceApp => new
            {
                workSurfaceApp.OnboardedApp.AppGroup.Name,
                workSurfaceApp.OnboardedApp.AppGroup.Order,
                workSurfaceApp.OnboardedApp.AppGroup.AccentColor
            });

            return appGrouping.Select(grouping => new WorkSurfaceAppGroupWithAppsDto
            {
                Name = grouping.Key.Name,
                AccentColor = grouping.Key.AccentColor,
                Order = grouping.Key.Order,
                Apps = grouping
                    .DistinctBy(workSurfaceApp => workSurfaceApp.OnboardedApp.Id)
                    .OrderBy(workSurfaceApp => workSurfaceApp.OnboardedApp.Name)
                    .ToList()
            })
                .OrderBy(appGroup => appGroup.Name)
                .ToList();
        }
    }
}
