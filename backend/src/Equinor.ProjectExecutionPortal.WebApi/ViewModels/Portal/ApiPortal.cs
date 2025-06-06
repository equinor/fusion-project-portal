﻿using Equinor.ProjectExecutionPortal.Application.Queries.Portals;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.ContextType;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.PortalApp;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal;

public class ApiPortal : ApiAudit
{
#pragma warning disable CS8618 // For integration tests only
    public ApiPortal() { }
#pragma warning restore CS8618 // For integration tests only

    public ApiPortal(PortalDto portalDto)
    {
        Id = portalDto.Id;
        Key = portalDto.Key;
        Name = portalDto.Name;
        ShortName = portalDto.ShortName;
        Subtext = portalDto.SubText;
        Description = portalDto.Description;
        Icon = portalDto.Icon;
        Contexts = portalDto.ContextTypes.Select(x => new ApiContextType(x)).ToList();
        ContextTypes = portalDto.ContextTypes.Select(x => x.ContextTypeKey).ToList();
        Apps = portalDto.Apps.Select(x => new ApiPortalApp(x)).ToList();
        Configuration = portalDto.Configuration != null ? new ApiPortalConfiguration(portalDto.Configuration) : null;
        Admins = portalDto.Admins?.Select(adminDto => new ApiPortalAdmin(adminDto)).ToList() ?? [];
        SupplyAudit(portalDto);
    }

    public Guid Id { get; set; }
    public string Key { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string ShortName { get; set; } = null!;
    public string Subtext { get; set; } = null!;
    public string? Description { get; set; }
    public string Icon { get; set; } = null!;
    public List<ApiContextType> Contexts { get; set; }
    public List<string> ContextTypes { get; set; }
    public List<ApiPortalApp> Apps { get; set; } = null!;
    public ApiPortalConfiguration? Configuration { get; set; }
    public List<ApiPortalAdmin> Admins { get; set; }
}
