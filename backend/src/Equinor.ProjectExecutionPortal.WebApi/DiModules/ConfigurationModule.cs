using Equinor.ProjectExecutionPortal.FusionPortalApi;
using Equinor.ProjectExecutionPortal.WebApi.AssetProxy;
using Equinor.ProjectExecutionPortal.WebApi.Authentication;
using Microsoft.Identity.Client;

namespace Equinor.ProjectExecutionPortal.WebApi.DiModules;

public static class ConfigurationModule
{
    public static void AddConfigurationModule(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<CacheOptions>(configuration.GetSection("CacheOptions"));
        services.Configure<AuthenticatorOptions>(configuration.GetSection("Authenticator"));
        services.Configure<FusionPortalApiOptions>(configuration.GetSection("FusionPortalApi"));
        services.Configure<AssetProxyOptions>(configuration.GetSection("AssetProxy"));
    }
}
