using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps.Models;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Data
{
    internal class FusionPortalAppsData
    {
        public class SeedData
        {
            public static string OneEquinor => "one-equinor";
        }

        public static List<ApiFusionPortalAppInformation> FusionApps => new()
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
                Key = "test-app2",
                Name = "A test app",
                Version = null,
                ShortName = "Test app",
                Description = "",
                PublishedDate = null,
                Type = null,
                AccentColor = null,
                Icon = null
            }
        };
    }

}
