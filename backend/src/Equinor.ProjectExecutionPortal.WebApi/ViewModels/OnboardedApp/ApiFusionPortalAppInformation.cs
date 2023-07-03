using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps.Models;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp;

public class ApiFusionPortalAppInformation
{
    public ApiFusionPortalAppInformation()
    { }

    public ApiFusionPortalAppInformation(FusionPortalAppInformation fusionAppInformation)
    {
        Key = fusionAppInformation.Key;
        Name = fusionAppInformation.Name;
        Version = fusionAppInformation.Version;
        ShortName = fusionAppInformation.ShortName;
        Description = fusionAppInformation.Description;
        PublishedDate = fusionAppInformation.PublishedDate;
        Tags = fusionAppInformation.Tags;
        Hide = fusionAppInformation.Hide;
        Order = fusionAppInformation.Order;
        Type = fusionAppInformation.Type;
        AccentColor = fusionAppInformation.AccentColor;
        Icon = fusionAppInformation.Icon;
        CategoryId = fusionAppInformation.CategoryId;
        Category = fusionAppInformation.Category != null ? new ApiFusionPortalAppInformationCategory(fusionAppInformation.Category) : null;
    }

    public string Key { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string? Version { get; set; }
    public string? ShortName { get; set; }
    public string? Description { get; set; }
    public string? PublishedDate { get; set; }
    public string[] Tags { get; set; } = null!;
    public bool? Hide { get; set; }
    public int Order { get; set; }
    public string? Type { get; set; }
    public string? AccentColor { get; set; }
    public string? Icon { get; set; }
    public Guid? CategoryId { get; set; }
    public ApiFusionPortalAppInformationCategory? Category { get; set; }

    public Guid[] Owners { get; set; }
    public FusionPortalAppInformationAdmin[] Admins { get; set; }
    public FusionPortalHealthCheck[] HealthChecks { get; set; }
    public FusionPortalRole[] RequiredRoles { get; set; }
}

public class ApiFusionPortalAppInformationCategory
{
    public ApiFusionPortalAppInformationCategory()
    { }

    public ApiFusionPortalAppInformationCategory(FusionPortalAppInformationCategory fusionCategory)
    {
        Id = fusionCategory.Id;
        Name = fusionCategory.Name;
        Color = fusionCategory.Color;
        DefaultIcon = fusionCategory.DefaultIcon;
    }

    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Color { get; set; }
    public string? DefaultIcon { get; set; }
}

public class ApiFusionPortalAppInformationAdmin
{
    public Guid AzureUniqueId { get; set; }
    public string FusionRole { get; set; }
    public FusionPortalProfile Profile { get; set; }
}
