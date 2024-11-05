using Equinor.ProjectExecutionPortal.Application.Queries.Portals;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.ContextType;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.FusionApp;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.PortalApp;

// TODO: Should be removed
public class ApiPortalApp
{
#pragma warning disable CS8618 // For integration tests only
    public ApiPortalApp()
#pragma warning restore CS8618 // For integration tests only
    {
    }

    public ApiPortalApp(PortalAppDto portalAppDto)
    {
        AppKey = portalAppDto.OnboardedApp.AppKey;
        ContextTypes = portalAppDto.OnboardedApp.ContextTypes.Select(x => new ApiContextType(x)).ToList();
        AppManifest = portalAppDto.OnboardedApp.AppInformation != null ? new ApiFusionApp(portalAppDto.OnboardedApp.AppInformation) : null;
    }

    public string AppKey { get; set; }
    public IList<ApiContextType> ContextTypes { get; set; }
    public ApiFusionApp? AppManifest { get; set; }
}
