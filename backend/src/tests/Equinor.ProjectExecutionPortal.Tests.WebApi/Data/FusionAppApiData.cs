using Fusion.Integration.Apps.Abstractions.Models;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Data
{
    internal class FusionAppApiData
    {
        public static List<App> ValidFusionApps =>
            [
            new()
            {
                AppKey = "meetings",
                DisplayName = "Meetings",
                Description = "Some description"
            },
            new()
            {
                AppKey = "reviews",
                DisplayName = "Reviews",
                Description = "Some description"
            },
            new()
            {
                AppKey = "tasks",
                DisplayName = "Tasks",
                Description = "Some description"
            },
            new()
            {
                AppKey = "one-equinor",
                DisplayName = "One Equinor",
                Description = "Some description"
            },
            new()
            {
                AppKey = "handover-garden",
                DisplayName= "Handover Garden",
                Description = "Some description"
            },
            new()
            {
                AppKey = "workorder-garden",
                DisplayName = "Workorder Garden",
                Description = "Some description"
            },
            new()
            {
                AppKey = "test-app",
                DisplayName = "A test app",
                Description = "Some description"
            },
            new()
            {
                AppKey = "app-to-be-offboarded",
                DisplayName = "An app to be offboarded by onboarded app tests",
                Description = "Some description"
            }
        ];
    }
}
