using Fusion.Integration.Apps.Abstractions.Models;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.FusionApp
{
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
}
