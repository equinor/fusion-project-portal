using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApps;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.FusionApp;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp;

public class ApiOnboardedAppExpanded : ApiOnboardedApp
{
    public ApiOnboardedAppExpanded()
    { }

    public ApiOnboardedAppExpanded(OnboardedAppDto onboardedAppDto) : base(onboardedAppDto)
    {
        AppManifest = onboardedAppDto.AppInformation != null ? new ApiFusionApp(onboardedAppDto.AppInformation) : null;
    }

    public ApiFusionApp? AppManifest { get; set; }
}
