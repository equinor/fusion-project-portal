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

            app.UseDefaultFiles(); // For static redirect

            app.UseSpaStaticFiles();

            app.UseSpaStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(filePath, "assets")),
                RequestPath = "/assets"
            });

            app.Map("",
                portal =>
                {
                    portal.UseSpa(spa =>
                    {
                        spa.Options.SourcePath = "wwwroot/ClientApp/development";
                        spa.Options.DefaultPageStaticFileOptions = new StaticFileOptions
                        {
                            FileProvider = new PhysicalFileProvider(filePath)
                        };
                    });
                });

            return app;
        }
    }
}
