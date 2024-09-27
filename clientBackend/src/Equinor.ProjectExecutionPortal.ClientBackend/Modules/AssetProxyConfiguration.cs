using Equinor.ProjectExecutionPortal.ClientBackend.AssetProxy;
using Equinor.ProjectExecutionPortal.ClientBackend.Configurations;

namespace Equinor.ProjectExecutionPortal.ClientBackend.Modules
{
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
            endpoints.MapGet("/assets/images/profiles/{uniqueId}", AssetProxyHandler.ProxyRequestAsync<ProfileImageRequestTransformer>);
            endpoints.MapGet("/images/profiles/{uniqueId}", AssetProxyHandler.ProxyRequestAsync<ProfileImageRequestTransformer>);
            endpoints.MapGet($"{Constants.FusionAppsRoute}/{{**catch-all}}", AssetProxyHandler.ProxyRequestAsync<FusionAppsApiResourcesRequestTransformer>);

            return endpoints;
        }
    }
}
