﻿using Equinor.ProjectExecutionPortal.Application.Services.AccountService;
using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.Application.Services.ContextService;
using Equinor.ProjectExecutionPortal.Application.Services.ContextTypeService;
using Equinor.ProjectExecutionPortal.Application.Services.FusionAppsService;
using Equinor.ProjectExecutionPortal.Application.Services.PortalService;

namespace Equinor.ProjectExecutionPortal.WebApi.DiModules;

public static class ApplicationServicesModule
{
    public static void AddApplicationServicesModules(this IServiceCollection services)
    {
        services.AddScoped<IAppService, AppService>();
        services.AddScoped<IFusionAppsService, FusionAppsService>();
        services.AddScoped<IContextService, ContextService>();
        services.AddScoped<IContextTypeService, ContextTypeService>();
        services.AddScoped<IPortalService, PortalService>();
        services.AddScoped<IAccountService, AccountService>();
    }
}
