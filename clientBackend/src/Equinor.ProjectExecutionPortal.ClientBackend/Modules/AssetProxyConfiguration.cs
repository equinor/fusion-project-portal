using Equinor.ProjectExecutionPortal.ClientBackend.AssetProxy;
using Equinor.ProjectExecutionPortal.ClientBackend.Configurations;

namespace Equinor.ProjectExecutionPortal.ClientBackend.Modules;

public static class AssetProxyConfigurationExtensions
{
    public static IServiceCollection AddFusionPortalAssetProxy(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddReverseProxy();
        services.AddOptions()
            .Configure<AssetProxyOptions>("AssetProxy", configuration);

        services.AddScoped<FusionAppsApiResourcesRequestTransformer>();
        services.AddScoped<ProfileImageRequestTransformer>();

        return services;
    }

    public static IEndpointRouteBuilder MapFusionPortalAssetProxy(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet($"{AssetProxyRoutes.AssetProfileImageRoute}/{{uniqueId}}", AssetProxyHandler.ProxyRequestAsync<ProfileImageRequestTransformer>);
        endpoints.MapGet($"{AssetProxyRoutes.ProfileImageRoute}/{{uniqueId}}", AssetProxyHandler.ProxyRequestAsync<ProfileImageRequestTransformer>);
        endpoints.MapGet($"{AssetProxyRoutes.FusionAppsRoute}/{{**catch-all}}", AssetProxyHandler.ProxyRequestAsync<FusionAppsApiResourcesRequestTransformer>);

        return endpoints;
    }
}
