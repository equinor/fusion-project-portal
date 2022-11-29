namespace Equinor.ProjectExecutionPortal.WebApi.AssetProxy
{
    public static class AssetProxyConfigurationExtensions
    {
        public static IServiceCollection AddFusionPortalAssetProxy(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddReverseProxy();
            services.AddOptions()
                .Configure<AssetProxyOptions>("AssetProxy", configuration);

            services.AddScoped<LegacyAppRequestTransformer>();
            services.AddScoped<LegacyAppResourcesRequestTransformer>();
            services.AddScoped<ProfileImageRequestTransformer>();

            return services;
        }

        public static IEndpointRouteBuilder MapFusionPortalAssetProxy(this IEndpointRouteBuilder endpoints)
        {
            endpoints.MapGet("/assets/legacy-apps/{appKey}.js", AssetProxyHandler.ProxyRequestAsync<LegacyAppRequestTransformer>);
            endpoints.MapGet("/assets/legacy-resources/{appKey}/{*resourcePath}", AssetProxyHandler.ProxyRequestAsync<LegacyAppResourcesRequestTransformer>);
            endpoints.MapGet("/assets/images/profiles/{uniqueId}", AssetProxyHandler.ProxyRequestAsync<ProfileImageRequestTransformer>);
            endpoints.MapGet("/images/profiles/{uniqueId}", AssetProxyHandler.ProxyRequestAsync<ProfileImageRequestTransformer>);

            return endpoints;
        }
    }
}
