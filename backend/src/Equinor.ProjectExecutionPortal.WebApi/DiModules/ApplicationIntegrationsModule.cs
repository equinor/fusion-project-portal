using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps;
using Equinor.ProjectExecutionPortal.FusionPortalApi.Client;

namespace Equinor.ProjectExecutionPortal.WebApi.DiModules;

public static class ApplicationIntegrationsModule
{
    public static void AddApplicationIntegrationsModule(this IServiceCollection services)
    {
        services.AddScoped<IBearerTokenFusionPortalApiClient, FusionPortalApiClient>();
        services.AddScoped<IFusionPortalApiService, FusionPortalApiService>();
    }
}
