using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaces;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.ContextType;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.PortalApp;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal
{
    public class ApiPortal
    {
        public ApiPortal() { }

        public ApiPortal(WorkSurfaceDto workSurfaceDto)
        {
            Id = workSurfaceDto.Id;
            Key = workSurfaceDto.Key;
            Name = workSurfaceDto.Name;
            ShortName = workSurfaceDto.ShortName;
            Subtext = workSurfaceDto.SubText;
            Description = workSurfaceDto.Description;
            Order = workSurfaceDto.Order;
            Icon = workSurfaceDto.Icon;
            IsDefault = workSurfaceDto.IsDefault;
            Contexts = workSurfaceDto.ContextTypes.Select(x => new ApiContextType(x)).ToList();
            Apps = workSurfaceDto.Apps.Select(x => new ApiPortalApp(x)).ToList();
        }

        public Guid Id { get; set; }
        public string Key { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string ShortName { get; set; } = null!;
        public string Subtext { get; set; } = null!;
        public string? Description { get; set; }
        public int Order { get; set; }
        public string Icon { get; set; } = null!;
        public bool IsDefault { get; set; }
        public IList<ApiContextType> Contexts { get; set; }
        public List<ApiPortalApp> Apps { get; set; } = null!;
    }
}
