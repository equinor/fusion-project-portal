﻿using Equinor.ProjectExecutionPortal.Application.Queries.Portals;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.FusionApp;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.PortalApp;

public class ApiPortalOnboardedApp
{
#pragma warning disable CS8618 // For integration tests only
    public ApiPortalOnboardedApp()
#pragma warning restore CS8618 // For integration tests only
    {
    }

    public ApiPortalOnboardedApp(PortalOnboardedAppDto portalOnboardedAppDto)
    {
        AppKey = portalOnboardedAppDto.OnboardedApp.AppKey;
        ContextTypes = portalOnboardedAppDto.OnboardedApp.ContextTypes.Select(x => x.ContextTypeKey).ToList();
        ContextIds = portalOnboardedAppDto.ContextIds;
        IsActive = portalOnboardedAppDto.IsActive;
        IsGlobal = portalOnboardedAppDto.IsGlobal;
        IsContextual = portalOnboardedAppDto.IsContextual;
        AppManifest = portalOnboardedAppDto.OnboardedApp.AppInformation != null ? new ApiFusionApp(portalOnboardedAppDto.OnboardedApp.AppInformation) : null;
        DoesNotExistInFusion = portalOnboardedAppDto.OnboardedApp.DoesNotExistInFusion;
    }

    public string AppKey { get; set; }
    public List<string> ContextTypes { get; set; }
    public List<Guid> ContextIds { get; set; }
    public bool IsActive { get; set; }
    public bool IsGlobal { get; set; }
    public bool IsContextual { get; set; }
    public ApiFusionApp? AppManifest { get; set; }
    public bool DoesNotExistInFusion { get; set; }
}
