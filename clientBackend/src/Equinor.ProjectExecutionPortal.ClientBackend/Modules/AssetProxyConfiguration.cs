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
            //services.AddScoped<FusionAppResourcesRequestTransformer>();
            services.AddScoped<FusionAppApiResourcesRequestTransformer>();
            services.AddScoped<ProfileImageRequestTransformer>();

            return services;
        }

        public static IEndpointRouteBuilder MapFusionPortalAssetProxy(this IEndpointRouteBuilder endpoints)
        {
            // TO BE REMOVED ENDPOINTS
            //endpoints.MapGet("/bundles/apps/{appKey}/resources/{*resourcePath}", AssetProxyHandler.ProxyRequestAsync<LegacyAppResourcesRequestTransformer>);

            // ENDPOINTS TO KEEP
            endpoints.MapGet("/assets/images/profiles/{uniqueId}", AssetProxyHandler.ProxyRequestAsync<ProfileImageRequestTransformer>);
            endpoints.MapGet("/images/profiles/{uniqueId}", AssetProxyHandler.ProxyRequestAsync<ProfileImageRequestTransformer>);

            // NEW ENDPOINTS
            //endpoints.MapGet("/api/apps/{appIdentifier}", AssetProxyHandler.ProxyRequestAsync<FusionAppResourcesRequestTransformer>);
            endpoints.MapGet($"{Constants.FusionAppsRoute}/{{**catch-all}}", AssetProxyHandler.ProxyRequestAsync<FusionAppApiResourcesRequestTransformer>);
            //endpoints.MapGet("/api/apps/{appIdentifier}/builds/{versionIdentifier}/config", AssetProxyHandler.ProxyRequestAsync<FusionAppResourcesRequestTransformer>);
            //endpoints.MapGet("/api/bundles/apps/{appIdentifier}/{versionIdentifier}", AssetProxyHandler.ProxyRequestAsync<FusionAppResourcesRequestTransformer>);
            //endpoints.MapGet("/api/bundles/apps/{appIdentifier}/{versionIdentifier}/{resource}", AssetProxyHandler.ProxyRequestAsync<FusionAppResourcesRequestTransformer>);

            return endpoints;
        }
    }
}
