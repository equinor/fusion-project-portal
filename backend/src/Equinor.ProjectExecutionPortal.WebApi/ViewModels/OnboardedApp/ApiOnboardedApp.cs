using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApps;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.AppGroup;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp
{
    public class ApiOnboardedApp
    {
        public ApiOnboardedApp() { }

        public ApiOnboardedApp(OnboardedAppDto onboardedAppDto)
        {
            Id = onboardedAppDto.Id;
            AppKey = onboardedAppDto.AppKey;
            Order = onboardedAppDto.Order;
            Name = onboardedAppDto.Name;
            Description = onboardedAppDto.Description;
            AppGroup = new ApiAppGroup(onboardedAppDto.AppGroup);
        }

        public Guid Id { get; set; }
        public string AppKey { get; set; } = null!;
        public int Order { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public ApiAppGroup AppGroup { get; set; } = null!;
    }
}
