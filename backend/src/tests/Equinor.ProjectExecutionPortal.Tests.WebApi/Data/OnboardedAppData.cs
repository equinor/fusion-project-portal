using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Data
{
    internal class OnboardedAppData
    {
        public class InitialDbSeedData
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
