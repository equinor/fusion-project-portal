using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps.Models;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Data
{
    internal class FusionPortalAppData
    {
        public static List<FusionPortalAppInformation> ValidFusionApps => new()
        {
            new FusionPortalAppInformation
            {
                Key = "meetings",
                Name = "Meetings",
                Version = null,
                ShortName = "Meetings",
                Description = "Some description",
                PublishedDate = null,
                Type = null,
                AccentColor = null,
                Icon = null
            },
            new FusionPortalAppInformation
            {
                Key = "reviews",
                Name = "Reviews",
                Version = null,
                ShortName = "Reviews",
                Description = "Some description",
                PublishedDate = null,
                Type = null,
                AccentColor = null,
                Icon = null
            },
            new FusionPortalAppInformation
            {
                Key = "tasks",
                Name = "Tasks",
                Version = null,
                ShortName = "Tasks",
                Description = "Some description",
                PublishedDate = null,
                Type = null,
                AccentColor = null,
                Icon = null
            },
            new FusionPortalAppInformation
            {
                Key = "one-equinor",
                Name = "One Equinor",
                Version = null,
                ShortName = "One Equinor",
                Description = "Some description",
                PublishedDate = null,
                Type = null,
                AccentColor = null,
                Icon = null
            },
            new FusionPortalAppInformation
            {
                Key = "handover-garden",
                Name = "Handover Garden",
                Version = null,
                ShortName = "Handover",
                Description = "Some description",
                PublishedDate = null,
                Type = null,
                AccentColor = null,
                Icon = null
            },
            new FusionPortalAppInformation
            {
                Key = "workorder-garden",
                Name = "Workorder Garden",
                Version = null,
                ShortName = "Workorder",
                Description = "Some description",
                PublishedDate = null,
                Type = null,
                AccentColor = null,
                Icon = null
            },
            new FusionPortalAppInformation
            {
                Key = "test-app",
                Name = "A test app",
                Version = null,
                ShortName = "TestApp",
                Description = "Some description",
                PublishedDate = null,
                Type = null,
                AccentColor = null,
                Icon = null
            },
            new FusionPortalAppInformation
            {
                Key = "app-to-be-removed",
                Name = "An app to be deleted by tests",
                Version = null,
                ShortName = "DeleteApp",
                Description = "Some description",
                PublishedDate = null,
                Type = null,
                AccentColor = null,
                Icon = null
            }
        };
    }

}
