using Equinor.ProjectExecutionPortal.Application.Queries.Portals;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.FusionApp;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.PortalApp;

public class ApiPortalOnboardedApp
{
    public ApiPortalOnboardedApp()
    { }

    public ApiPortalOnboardedApp(PortalOnboardedAppDto portalOnboardedAppDto)
    {
        AppKey = portalOnboardedAppDto.OnboardedApp.AppKey;
        ContextTypes = portalOnboardedAppDto.OnboardedApp.ContextTypes.Select(x => x.ContextTypeKey).ToList();
        ContextIds = portalOnboardedAppDto.ContextIds;
        IsActive = portalOnboardedAppDto.IsActive;
        IsGlobal = portalOnboardedAppDto.IsGlobal;
        IsContextual = portalOnboardedAppDto.IsContextual;
        AppManifest = portalOnboardedAppDto.OnboardedApp.AppInformation != null ? new ApiFusionApp(portalOnboardedAppDto.OnboardedApp.AppInformation) : null;
    }

    public string AppKey { get; set; }
    public IList<string> ContextTypes { get; set; }
    public IList<Guid> ContextIds { get; set; }
    public bool IsActive { get; set; }
    public bool IsGlobal { get; set; }
    public bool IsContextual { get; set; }
    public ApiFusionApp? AppManifest { get; set; }
}