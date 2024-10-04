using Fusion.Integration.Apps.Abstractions.Models;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.FusionApp
{
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
}
