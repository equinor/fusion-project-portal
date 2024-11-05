using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Data;

internal static class OnboardedAppData
{
    public static class InitialDbSeedData
    {
        public static readonly OnboardedApp MeetingsApp = new("meetings");
        public static readonly OnboardedApp ReviewsApp = new("reviews");
        public static readonly OnboardedApp TasksApp = new("tasks");
        public static readonly OnboardedApp OrgChartApp = new("one-equinor");
        public static readonly OnboardedApp HandoverGardenApp = new("handover-garden");
        public static readonly OnboardedApp WorkOrderGardenApp = new("workorder-garden");
    }
}