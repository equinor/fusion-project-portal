using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaceAppGroup;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceAppGroup
{
    public class ApiAppGroup
    {
        public ApiAppGroup()
        { }

        public ApiAppGroup(AppGroupDto appGroupDto)
        {
            Id = appGroupDto.Id;
            Name = appGroupDto.Name;
            Order = appGroupDto.Order;
            AccentColor = appGroupDto.AccentColor;
            Apps = appGroupDto.Apps.Select(x => new ApiOnboardedApp(x)).ToList();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Order { get; set; }
        public string AccentColor { get; set; }
        public List<ApiOnboardedApp> Apps { get; set; }
    }
}
