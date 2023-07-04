using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.Application.Services.WorkSurfaceService;

namespace Equinor.ProjectExecutionPortal.WebApi.DiModules;

public static class ServicesModule
{
    public static void AddServicesModule(this IServiceCollection services)
    {
        services.AddScoped<IAppService, AppService>();
        services.AddScoped<IWorkSurfaceService, WorkSurfaceService>();
    }
}
