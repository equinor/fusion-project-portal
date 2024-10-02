using Fusion.Integration.Apps.Abstractions.Models;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp;

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

    public string AppKey { get; set; } = null!;
    public string DisplayName { get; set; } = null!;
    public string? Description { get; set; } = null!;
    public string? Type { get; set; } = null!;
    public string? Version { get; set; }
    public bool? IsPinned { get; set; }
    public string? TemplateSource { get; set; }
    public ApiFusionAppCategory? Category { get; set; }
    public ApiFusionAppVersion? Build { get; set; }
}

public class ApiFusionAppCategory
{
    public ApiFusionAppCategory()
    { }

    public ApiFusionAppCategory(AppCategory fusionAppCategory)
    {
        Id = fusionAppCategory.Id;
        Name = fusionAppCategory.Name;
        DisplayName = fusionAppCategory.DisplayName;
        Color = fusionAppCategory.Color;
        DefaultIcon = fusionAppCategory.DefaultIcon;
        SortOrder = fusionAppCategory.SortOrder;
    }

    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string DisplayName { get; set; } = null!;
    public string Color { get; set; } = null!;
    public string DefaultIcon { get; set; } = null!;
    public short SortOrder { get; set; }
}

public class ApiFusionAppVersion
{
    public ApiFusionAppVersion()
    { }

    public ApiFusionAppVersion(AppVersion fusionAppVersion)
    {
        Version = fusionAppVersion.Version;
        EntryPoint = fusionAppVersion.EntryPoint;
        Tags = fusionAppVersion.Tags;
        Tag = fusionAppVersion.Tag;
        AssetPath = fusionAppVersion.AssetPath;
        ConfigUrl = fusionAppVersion.ConfigUrl;
    }

    public string Version { get; set; } = null!;
    public string EntryPoint { get; set; } = null!;
    public List<string>? Tags { get; set; }
    public string? Tag { get; set; }
    public string? AssetPath { get; set; }
    public string? ConfigUrl { get; set; }
}
