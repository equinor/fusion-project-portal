using Equinor.ProjectExecutionPortal.Application.Cache;

namespace Equinor.ProjectExecutionPortal.WebApi.DiModules;

public static class CacheModule
{
    public static void AddCacheModule(this IServiceCollection services)
    {
        services.AddSingleton<ICacheManager, CacheManager>();

        services.AddScoped<IFusionAppsCache, FusionAppsCache>();
    }
}
