using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Data
{
    internal class OnboardedAppsData
    {
        public class InitialSeedData
        {
            public static OnboardedApp MeetingsApp = new("meetings");
            public static OnboardedApp ReviewsApp = new("reviews");
            public static OnboardedApp TasksApp = new("tasks");
            public static OnboardedApp OrgChartApp = new("one-equinor");
            public static OnboardedApp HandoverGardenApp = new("handover-garden");
            public static OnboardedApp WorkOrderGardenApp = new("workorder-garden");
        }
    }
}
