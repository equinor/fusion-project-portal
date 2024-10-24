using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApps;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.ContextType;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.FusionApp;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp
{
    public class ApiOnboardedApp
    {
        public ApiOnboardedApp()
        { }

        public ApiOnboardedApp(OnboardedAppDto onboardedAppDto)
        {
            Id = onboardedAppDto.Id;
            AppKey = onboardedAppDto.AppKey;
            Name = onboardedAppDto.AppInformation?.DisplayName;
            Description = onboardedAppDto.AppInformation?.Description;
            Contexts = onboardedAppDto.ContextTypes.Select(x => new ApiContextType(x)).ToList();
            ContextTypes = onboardedAppDto.ContextTypes.Select(x => x.ContextTypeKey).ToList();
        }

        public Guid Id { get; set; }
        public string AppKey { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public IList<ApiContextType> Contexts { get; set; } = new List<ApiContextType>();
        public IList<string> ContextTypes { get; set; } = new List<string>();
    }

    public class ApiOnboardedAppExpanded : ApiOnboardedApp
    {
        public ApiOnboardedAppExpanded()
        { }

        public ApiOnboardedAppExpanded(OnboardedAppDto onboardedAppDto)
        {
            Id = onboardedAppDto.Id;
            AppKey = onboardedAppDto.AppKey;
            Name = onboardedAppDto.AppInformation?.DisplayName;
            Description = onboardedAppDto.AppInformation?.Description;
            Contexts = onboardedAppDto.ContextTypes.Select(x => new ApiContextType(x)).ToList();
            ContextTypes = onboardedAppDto.ContextTypes.Select(x => x.ContextTypeKey).ToList();
            AppInformation = onboardedAppDto.AppInformation != null ? new ApiFusionApp(onboardedAppDto.AppInformation) : null;
        }

        public ApiFusionApp? AppInformation { get; set; }
    }
}
