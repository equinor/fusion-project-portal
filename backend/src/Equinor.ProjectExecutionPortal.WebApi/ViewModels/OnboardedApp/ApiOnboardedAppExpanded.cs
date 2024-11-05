using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApps;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.ContextType;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.FusionApp;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp;

public class ApiOnboardedAppExpanded : ApiOnboardedApp
{
    public ApiOnboardedAppExpanded()
    { }

    public ApiOnboardedAppExpanded(OnboardedAppDto onboardedAppDto)
    {
        Id = onboardedAppDto.Id;
        AppKey = onboardedAppDto.AppKey;
        DisplayName = onboardedAppDto.AppInformation?.DisplayName;
        Description = onboardedAppDto.AppInformation?.Description;
        Contexts = onboardedAppDto.ContextTypes.Select(x => new ApiContextType(x)).ToList();
        ContextTypes = onboardedAppDto.ContextTypes.Select(x => x.ContextTypeKey).ToList();
        AppManifest = onboardedAppDto.AppInformation != null ? new ApiFusionApp(onboardedAppDto.AppInformation) : null;
    }

    public ApiFusionApp? AppManifest { get; set; }
}
