using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps;
using Equinor.ProjectExecutionPortal.FusionPortalApi.Client;

namespace Equinor.ProjectExecutionPortal.WebApi.DiModules;

public static class IntegrationsModule
{
    public static void AddIntegrationsModule(this IServiceCollection services)
    {
        services.AddScoped<IBearerTokenFusionPortalApiClient, FusionPortalApiClient>();
        services.AddScoped<IFusionPortalApiService, FusionPortalApiService>();
    }
}
