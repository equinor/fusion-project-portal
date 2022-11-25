using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps.Models;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Data
{
    internal class FusionPortalAppsData
    {
        public class InitialSeedData
        {
            public static string OneEquinor => "one-equinor";
        }

        public static List<ApiFusionPortalAppInformation> ValidFusionApps => new()
        {
            new ApiFusionPortalAppInformation
            {
                Key = "one-equinor",
                Name = "One Equinor",
                Version = null,
                ShortName = "One Equinor",
                Description = "",
                PublishedDate = null,
                Type = null,
                AccentColor = null,
                Icon = null
            },
            new ApiFusionPortalAppInformation
            {
                Key = "test-app",
                Name = "A test app",
                Version = null,
                ShortName = "Test app",
                Description = "",
                PublishedDate = null,
                Type = null,
                AccentColor = null,
                Icon = null
            },
            new ApiFusionPortalAppInformation
            {
                Key = "app-to-be-removed",
                Name = "An app that should be removed",
                Version = null,
                ShortName = "App to be removed",
                Description = "",
                PublishedDate = null,
                Type = null,
                AccentColor = null,
                Icon = null
            }
        };
    }

}
