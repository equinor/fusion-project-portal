using Fusion.Integration.Apps.Abstractions.Models;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.FusionApp;

public class ApiFusionAppVersion
{
    public ApiFusionAppVersion()
    { }

    public ApiFusionAppVersion(AppVersion fusionAppVersion)
    {
        Version = fusionAppVersion.Version;
    }

    public string Version { get; set; }
}