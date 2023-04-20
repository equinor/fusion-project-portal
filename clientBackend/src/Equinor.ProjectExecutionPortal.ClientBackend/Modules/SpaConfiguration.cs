using Microsoft.Extensions.FileProviders;

namespace Equinor.ProjectExecutionPortal.ClientBackend.Modules
{
    public static class SpaConfigurationExtensions
    {
        public static IServiceCollection AddSpa(this IServiceCollection services, WebApplicationBuilder builder)
        {
            var filePath = builder.Environment.IsDevelopment()
                ? Path.Combine(builder.Environment.ContentRootPath, "wwwroot", "ClientApp", "development")
                : Path.Combine(builder.Environment.ContentRootPath, "wwwroot", "ClientApp", "production");

            // Where to find the static resources (production builds) of the SPA
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = filePath;
            });

            return services;
        }

        public static IApplicationBuilder MapSpaEndpoints(this IApplicationBuilder app, WebApplicationBuilder builder)
        {
            var filePath = builder.Environment.IsDevelopment()
                ? Path.Combine(builder.Environment.ContentRootPath, "wwwroot", "ClientApp", "development")
                : Path.Combine(builder.Environment.ContentRootPath, "wwwroot", "ClientApp", "production");

            // New way
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapFallbackToController("Index", "Bundle");
            });

            app.UseDefaultFiles(); // For static redirect

            app.UseSpaStaticFiles();

            app.UseSpaStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(filePath, "assets")),
                RequestPath = "/assets"
            });

            // Old way
            //app.Map("", portal =>
            //    {
            //        portal.UseSpa(spa =>
            //        {
            //            spa.Options.SourcePath = filePath;
            //            spa.Options.DefaultPageStaticFileOptions = new StaticFileOptions
            //            {
            //                FileProvider = new PhysicalFileProvider(filePath)
            //            };
            //        });
            //    });

            return app;
        }
    }
}
