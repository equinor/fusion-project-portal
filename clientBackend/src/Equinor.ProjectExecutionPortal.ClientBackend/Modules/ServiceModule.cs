using Equinor.ProjectExecutionPortal.ClientBackend.Services;

namespace Equinor.ProjectExecutionPortal.ClientBackend.Modules;

public static class ServiceModule
{
    public static void AddServiceModule(this IServiceCollection services)
    {
        services.AddScoped<IClientBundleService, ClientBundleService>();
    }
}
