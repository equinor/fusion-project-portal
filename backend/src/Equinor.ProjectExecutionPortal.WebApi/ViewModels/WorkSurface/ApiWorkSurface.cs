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

        public Guid Id { get; }
        public string Key { get; }
        public string Name { get; }
        public string ShortName { get; }
        public string Subtext { get; }
        public int Order { get; }
        public string Icon { get; }
        public bool IsDefault { get; }
        public List<ApiWorkSurfaceAppGroup> AppGroups { get; }
    }
}
