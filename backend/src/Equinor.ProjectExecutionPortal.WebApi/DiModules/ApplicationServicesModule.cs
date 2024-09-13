using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.Application.Services.ContextService;
using Equinor.ProjectExecutionPortal.Application.Services.ContextTypeService;
using Equinor.ProjectExecutionPortal.Application.Services.PortalService;

namespace Equinor.ProjectExecutionPortal.WebApi.DiModules;

public static class ApplicationServicesModule
{
    public static void AddApplicationServicesModules(this IServiceCollection services)
    {
        services.AddScoped<IAppService, AppService>();
        services.AddScoped<IContextService, ContextService>();
        services.AddScoped<IContextTypeService, ContextTypeService>();
        services.AddScoped<IPortalService, PortalService>();
    }
}
