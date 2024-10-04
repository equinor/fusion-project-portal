using Fusion.Integration.Apps.Abstractions.Models;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Data
{
    internal class FusionAppsData
    {
        public static List<App> ValidFusionApps =>
        [
            new()
            {
                AppKey = "meetings",
                DisplayName = "Meetings",
                Description = "Some description",
                Type = null
            },
            new()
            {
                AppKey = "reviews",
                DisplayName = "Reviews",
                Description = "Some description",
                Type = null
            },
            new()
            {
                AppKey = "tasks",
                DisplayName = "Tasks",
                Description = "Some description",
                Type = null
            },
            new()
            {
                AppKey = "one-equinor",
                DisplayName = "One Equinor",
                Description = "Some description",
                Type = null
            },
            new()
            {
                AppKey = "handover-garden",
                DisplayName= "Handover Garden",
                Description = "Some description",
                Type = null
            },
            new()
            {
                AppKey = "workorder-garden",
                DisplayName = "Workorder Garden",
                Description = "Some description",
                Type = null
            },
            new()
            {
                AppKey = "test-app",
                DisplayName = "A test app",
                Description = "Some description",
                Type = null
            },
            new()
            {
                AppKey = "app-to-be-removed",
                DisplayName = "An app to be deleted by tests",
                Description = "Some description",
                Type = null
            }
        ];
    }
}
