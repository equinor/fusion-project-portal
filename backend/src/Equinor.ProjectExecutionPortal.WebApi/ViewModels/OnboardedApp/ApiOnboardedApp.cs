using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApp;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp
{
    public class ApiOnboardedApp
    {
        public ApiOnboardedApp()
        {
        }

        public ApiOnboardedApp(OnboardedAppDto onboardedAppDto)
        {
            AppKey = onboardedAppDto.AppKey;
        }
        
        public string AppKey { get; set; }
    }
}
