using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApps;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.ContextType;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp;

public class ApiOnboardedApp : ApiAudit
{
#pragma warning disable CS8618 // For integration tests only
    public ApiOnboardedApp()
#pragma warning restore CS8618 // For integration tests only
    {
    }

    public ApiOnboardedApp(OnboardedAppDto onboardedAppDto)
    {
        Id = onboardedAppDto.Id;
        AppKey = onboardedAppDto.AppKey;
        DisplayName = onboardedAppDto.AppInformation?.DisplayName;
        Description = onboardedAppDto.AppInformation?.Description;
        Contexts = onboardedAppDto.ContextTypes.Select(x => new ApiContextType(x)).ToList();
        ContextTypes = onboardedAppDto.ContextTypes.Select(x => x.ContextTypeKey).ToList();
        SupplyAudit(onboardedAppDto);
    }

    public Guid Id { get; set; }
    public string AppKey { get; set; }
    public string? DisplayName { get; set; }
    public string? Description { get; set; }
    public IList<ApiContextType> Contexts { get; set; } = new List<ApiContextType>();
    public IList<string> ContextTypes { get; set; } = new List<string>();
}
