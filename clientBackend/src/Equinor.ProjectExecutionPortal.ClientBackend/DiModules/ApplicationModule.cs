using Equinor.ProjectExecutionPortal.ClientBackend.AssetProxy;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Client;

namespace Equinor.ProjectExecutionPortal.ClientBackend.DiModules;

public static class ApplicationModule
{
    public static void AddApplicationModules(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<CacheOptions>(configuration.GetSection("CacheOptions"));
        //services.Configure<AuthenticatorOptions>(configuration.GetSection("Authenticator"));
        //services.Configure<FusionPortalApiOptions>(configuration.GetSection("FusionPortalApi"));
        services.Configure<AssetProxyOptions>(configuration.GetSection("AssetProxy"));

        //services.AddAuthorization(options =>
        //{
        //    options.AddPolicy("default", policy =>
        //    {
        //        policy.AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme);
        //        policy.RequireAuthenticatedUser();
        //    });
        //});

        services.AddHttpContextAccessor();
    }
}
