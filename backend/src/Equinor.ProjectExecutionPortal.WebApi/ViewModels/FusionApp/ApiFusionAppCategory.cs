using Fusion.Integration.Apps.Abstractions.Models;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.FusionApp;

public class ApiFusionAppCategory
{
#pragma warning disable CS8618 // // For integration tests only
    public ApiFusionAppCategory()
#pragma warning restore CS8618 // // For integration tests only
    {
    }

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
    public string Name { get; set; }
    public string DisplayName { get; set; }
    public string Color { get; set; }
    public string DefaultIcon { get; set; }
    public short SortOrder { get; set; }
}
