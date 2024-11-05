using Fusion.Integration.Apps.Abstractions.Models;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Data
{
    internal static class FusionAppApiData
    {
        public static App MeetingsFusion => new()
        {
            AppKey = "meetings",
            DisplayName = "Meetings",
            Description = "Some description"
        };

        public static App ReviewsFusion => new()
        {
            AppKey = "reviews",
            DisplayName = "Reviews",
            Description = "Some description"
        };

        public static App TasksFusion => new()
        {
            AppKey = "tasks",
            DisplayName = "Tasks",
            Description = "Some description"
        };

        public static App OneEquinorFusion => new()
        {
            AppKey = "one-equinor",
            DisplayName = "One Equinor",
            Description = "Some description"
        };

        public static App HandoverGardenFusion => new()
        {
            AppKey = "handover-garden",
            DisplayName = "Handover Garden",
            Description = "Some description"
        };

        public static App WorkOrderGardenFusion => new()
        {
            AppKey = "workorder-garden",
            DisplayName = "Workorder Garden",
            Description = "Some description"
        };

        public static App TestFusion => new()
        {
            AppKey = "test-app",
            DisplayName = "A test app",
            Description = "Some description"
        };

        public static App TestToBeOffboardedFusion => new()
        {
            AppKey = "app-to-be-offboarded",
            DisplayName = "An app to be offboarded by onboarded app tests",
            Description = "Some description"
        };

        public static App NonExistentApp => new()
        {
            AppKey = "i-do-not-exist-in-fusion",
            DisplayName = "i-do-not-exist-in-fusion",
            Description = "i-do-not-exist-in-fusion"
        };

        public static List<App> ValidFusionApps =>
            [MeetingsFusion, ReviewsFusion, TasksFusion, OneEquinorFusion, HandoverGardenFusion, WorkOrderGardenFusion, TestFusion, TestToBeOffboardedFusion];
    }
}
