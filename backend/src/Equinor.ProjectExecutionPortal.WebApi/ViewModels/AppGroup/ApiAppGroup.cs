using Equinor.ProjectExecutionPortal.Application.Queries.AppGroups;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.AppGroup
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
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Order { get; set; }
        public string AccentColor { get; set; }
    }
}
