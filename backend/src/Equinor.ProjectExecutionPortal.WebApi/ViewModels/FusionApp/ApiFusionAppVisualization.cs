using Fusion.Integration.Apps.Abstractions.Models;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.FusionApp;

public class ApiFusionAppVisualization
{
    public ApiFusionAppVisualization()
    {
    }

    public ApiFusionAppVisualization(AppVisualization appVisualization)
    {
        Color = appVisualization.Color;
        Icon = appVisualization.Icon;
        SortOrder = appVisualization.SortOrder;
    }

    public string? Color { get; set; }
    public string? Icon { get; set; }
    public short SortOrder { get; set; }
}
