using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApp;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.AppGroup;

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
            AppGroup = new ApiAppGroup(onboardedAppDto.AppGroup);
        }
        
        public string AppKey { get; set; }
        public ApiAppGroup AppGroup { get; set; }
    }
}
