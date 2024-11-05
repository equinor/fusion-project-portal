using Fusion.Integration.Apps.Abstractions.Models;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.FusionApp;

public class ApiFusionApp
{
#pragma warning disable CS8618 // For integration tests only
    public ApiFusionApp()
#pragma warning restore CS8618 // For integration tests only
    {
    }

    public ApiFusionApp(App fusionApp)
    {
        AppKey = fusionApp.AppKey;
        DisplayName = fusionApp.DisplayName;
        Description = fusionApp.Description;
        Type = fusionApp.Type;
        Category = fusionApp.Category != null ? new ApiFusionAppCategory(fusionApp.Category) : null;
        Build = fusionApp.Build != null ? new ApiFusionAppVersion(fusionApp.Build) : null;
        Visualization = fusionApp.Visualization != null ? new ApiFusionAppVisualization(fusionApp.Visualization) : null;
    }

    public string AppKey { get; set; }
    public string DisplayName { get; set; }
    public string? Description { get; set; }
    public string? Type { get; set; }
    public ApiFusionAppCategory? Category { get; set; }
    public ApiFusionAppVersion? Build { get; set; }
    public ApiFusionAppVisualization? Visualization { get; set; }
}
