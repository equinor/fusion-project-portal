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

            services.AddScoped<LegacyAppResourcesRequestTransformer>();
            services.AddScoped<ProfileImageRequestTransformer>();

            //services.AddScoped<FusionAppRequestTransformer>();

            return services;
        }

        public static IEndpointRouteBuilder MapFusionPortalAssetProxy(this IEndpointRouteBuilder endpoints)
        {
            endpoints.MapGet("/bundles/apps/{appKey}/resources/{*resourcePath}", AssetProxyHandler.ProxyRequestAsync<LegacyAppResourcesRequestTransformer>);
            endpoints.MapGet("/assets/images/profiles/{uniqueId}", AssetProxyHandler.ProxyRequestAsync<ProfileImageRequestTransformer>);
            endpoints.MapGet("/images/profiles/{uniqueId}", AssetProxyHandler.ProxyRequestAsync<ProfileImageRequestTransformer>);

            //endpoints.MapGet("/bundles/apps/{appKey}", AssetProxyHandler.ProxyRequestAsync<FusionAppRequestTransformer>);

            return endpoints;
        }
    }
}
