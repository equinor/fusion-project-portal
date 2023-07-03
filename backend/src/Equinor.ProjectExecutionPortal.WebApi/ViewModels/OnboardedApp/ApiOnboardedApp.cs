using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApps;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.AppGroup;

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
            Order = onboardedAppDto.Order;
            IsLegacy = onboardedAppDto.IsLegacy;
            Name = onboardedAppDto.AppInformation?.Name;
            Description = onboardedAppDto.AppInformation?.Description;
            AppGroup = new ApiAppGroup(onboardedAppDto.AppGroup);
            AppInformation = onboardedAppDto.AppInformation != null ? new ApiFusionPortalAppInformation(onboardedAppDto.AppInformation) : null;
        }

        public Guid Id { get; set; }
        public string AppKey { get; set; } = null!;
        public int Order { get; set; }
        public bool IsLegacy { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public ApiAppGroup AppGroup { get; set; } = null!;
        public ApiFusionPortalAppInformation? AppInformation { get; set; }
    }
}
