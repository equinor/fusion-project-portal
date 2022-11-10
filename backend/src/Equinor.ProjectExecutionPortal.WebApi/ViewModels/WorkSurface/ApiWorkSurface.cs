using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceAppGroup;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurface
{
    public class ApiWorkSurface
    {
        public ApiWorkSurface(WorkSurfaceDto workSurfaceDto)
        {
            Id = workSurfaceDto.Id;
            Key = workSurfaceDto.Key;
            Name = workSurfaceDto.Name;
            ShortName = workSurfaceDto.ShortName;
            Subtext = workSurfaceDto.SubText;
            Order = workSurfaceDto.Order;
            Icon = workSurfaceDto.Icon;
            IsDefault = workSurfaceDto.IsDefault;
            AppGroups = workSurfaceDto.AppGroups.Select(x => new ApiWorkSurfaceAppGroup(x)).ToList();
        }

        public Guid Id { get; set; }
        public string Key { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public string Subtext { get; set; }
        public int Order { get; set; }
        public string Icon { get; set; }
        public bool IsDefault { get; set; }
        public List<ApiWorkSurfaceAppGroup> AppGroups { get; set; }
    }
}
