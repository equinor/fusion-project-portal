using Fusion.Integration.Apps.Abstractions.Models;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.FusionApp;

public class ApiFusionAppVersion
{
#pragma warning disable CS8618 // For integration tests only
    public ApiFusionAppVersion()
#pragma warning restore CS8618 // For integration tests only
    {
    }

    public ApiFusionAppVersion(AppVersion fusionAppVersion)
    {
        Version = fusionAppVersion.Version;
    }

    public string Version { get; set; }
}
