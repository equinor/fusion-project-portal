using Equinor.ProjectExecutionPortal.Application.Queries.Portals;

namespace Equinor.ProjectExecutionPortal.Application.Services.PortalService
{
    public class PortalService : IPortalService
    {
        public PortalService()
        {
        }

        /// <summary>
        /// Maps a Portal to an ordered grouping by AppGroups with respective destinct and ordered apps
        /// </summary>
        public List<PortalAppGroupWithAppsDto>? MapPortalToAppGroups(PortalDto portal)
        {
            var appGrouping = portal.Apps.GroupBy(portalApp => new
            {
                portalApp.OnboardedApp.AppGroup.Name,
                portalApp.OnboardedApp.AppGroup.Order,
                portalApp.OnboardedApp.AppGroup.AccentColor
            });

            return appGrouping.Select(grouping => new PortalAppGroupWithAppsDto
            {
                Name = grouping.Key.Name,
                AccentColor = grouping.Key.AccentColor,
                Order = grouping.Key.Order,
                Apps = grouping
                    .DistinctBy(portalApp => portalApp.OnboardedApp.Id)
                    .OrderBy(portalApp => portalApp.OnboardedApp.AppInformation?.Name)
                    .ToList()
            })
                .OrderBy(appGroup => appGroup.Name)
                .ToList();
        }
    }
}
