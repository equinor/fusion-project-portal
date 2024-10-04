using Fusion.Integration.Apps.Abstractions.Models;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.FusionApp;

public class ApiFusionApp
{
    public ApiFusionApp()
    { }

    public ApiFusionApp(App fusionApp)
    {
        AppKey = fusionApp.AppKey;
        DisplayName = fusionApp.DisplayName;
        Description = fusionApp.Description;
        Type = fusionApp.Type;
        IsPinned = fusionApp.IsPinned;
        TemplateSource = fusionApp.TemplateSource;
        Category = fusionApp.Category != null ? new ApiFusionAppCategory(fusionApp.Category) : null;
        Build = fusionApp.Build != null ? new ApiFusionAppVersion(fusionApp.Build) : null;
    }

    public string AppKey { get; set; }
    public string DisplayName { get; set; }
    public string? Description { get; set; }
    public string? Type { get; set; }
    public string? Version { get; set; }
    public bool? IsPinned { get; set; }
    public string? TemplateSource { get; set; }
    public ApiFusionAppCategory? Category { get; set; }
    public ApiFusionAppVersion? Build { get; set; }
}
