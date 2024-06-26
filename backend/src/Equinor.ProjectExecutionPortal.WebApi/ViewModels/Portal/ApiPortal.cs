﻿using Equinor.ProjectExecutionPortal.Application.Queries.Portals;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.ContextType;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.PortalApp;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal
{
    public class ApiPortal
    {
        public ApiPortal() { }

        public ApiPortal(PortalDto portalDto)
        {
            Id = portalDto.Id;
            Key = portalDto.Key;
            Name = portalDto.Name;
            ShortName = portalDto.ShortName;
            Subtext = portalDto.SubText;
            Description = portalDto.Description;
            Order = portalDto.Order;
            Icon = portalDto.Icon;
            IsDefault = portalDto.IsDefault;
            Contexts = portalDto.ContextTypes.Select(x => new ApiContextType(x)).ToList();
            Apps = portalDto.Apps.Select(x => new ApiPortalApp(x)).ToList();
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
