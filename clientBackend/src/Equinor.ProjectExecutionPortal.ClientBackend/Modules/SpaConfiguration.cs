using Equinor.ProjectExecutionPortal.ClientBackend.Services;
using Microsoft.Extensions.FileProviders;

namespace Equinor.ProjectExecutionPortal.ClientBackend.Modules
{
    public static class SpaConfigurationExtensions
    {
        public static IServiceCollection AddSpa(this IServiceCollection services, WebApplicationBuilder builder)
        {
            var filePath = ClientBundleService.GetClientBundleFolderPath(builder.Environment);

            // Where to find the static resources (production builds) of the SPA
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = filePath;
            });

            return services;
        }

        public static IApplicationBuilder MapSpaEndpoints(this IApplicationBuilder app, WebApplicationBuilder builder)
        {
            var filePath = ClientBundleService.GetClientBundleFolderPath(builder.Environment);

            // Setup router to fallback to SPA application if route is not mapped
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapFallbackToController("Index", "Bundle");
            });

            app.UseDefaultFiles(); // For static redirect

            app.UseSpaStaticFiles();

            //app.UseSpaStaticFiles(new StaticFileOptions
            //{
            //    FileProvider = new PhysicalFileProvider(Path.Combine(filePath, "assets")),
            //    RequestPath = "/assets"
            //});

            return app;
        }
    }
}
