using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Data
{
    internal class OnboardedAppsData
    {
        public class InitialSeedData
        {
            public static OnboardedApp MeetingsApp = new("meetings", 0, false);
            public static OnboardedApp ReviewsApp = new("reviews", 1, false);
            public static OnboardedApp TasksApp = new("tasks", 2, false);
            public static OnboardedApp OrgChartApp = new("one-equinor", 3, false);
            public static OnboardedApp HandoverGardenApp = new("handover-garden", 4, false);
            public static OnboardedApp WorkOrderGardenApp = new("workorder-garden", 5, false);
        }
    }
}
