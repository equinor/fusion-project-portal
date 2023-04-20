using Equinor.ProjectExecutionPortal.ClientBackend.Configurations;
using Equinor.ProjectExecutionPortal.ClientBackend.Modules;
using Fusion.Integration;
using Fusion.Integration.Http;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.Identity.Client;
using Microsoft.Identity.Web;
using Constants = Equinor.ProjectExecutionPortal.ClientBackend.Constants;

// TODO: Dynamic config inject into JS
// TODO: Application Insights
// TODO: Domain
// TODO: Dynatrace ???

var builder = WebApplication.CreateBuilder(args);

// AppSettings configuration
builder.Services.Configure<ClientBundleOptions>(builder.Configuration.GetSection("ClientBundle"));
builder.Services.Configure<FusionPortalApiOptions>(builder.Configuration.GetSection("FusionPortalApi"));
builder.Services.Configure<FusionProjectPortalApiOptions>(builder.Configuration.GetSection("FusionProjectPortalApi"));
builder.Services.Configure<AssetProxyOptions>(builder.Configuration.GetSection("AssetProxy"));
builder.Services.Configure<CacheOptions>(builder.Configuration.GetSection("Cache"));

// Add bearer auth
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration)
    .EnableTokenAcquisitionToCallDownstreamApi()
    .AddInMemoryTokenCaches();

// Add cookie auth
builder.Services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApp(builder.Configuration)
    .EnableTokenAcquisitionToCallDownstreamApi()
    .AddInMemoryTokenCaches();

// Add fusion integration
builder.Services.AddFusionIntegration(fusionIntegrationConfig =>
{
    fusionIntegrationConfig.UseServiceInformation("Fusion.Project.Portal", "Dev");
    fusionIntegrationConfig.UseDefaultEndpointResolver("ci");
    fusionIntegrationConfig.UseMsalTokenProvider();
    fusionIntegrationConfig.DisableClaimsTransformation();
});

// Add http client to the fusion portal api. This can be fetched from the IHttpClientFactory
builder.Services.AddFusionIntegrationHttpClient(Constants.HttpClientPortal, fusionHttpClientOptions =>
{
    fusionHttpClientOptions.UseDelegateToken = true;
    fusionHttpClientOptions.UseFusionEndpoint(FusionEndpoint.Portal);
});

builder.Services.AddControllersWithViews();

// SPA Configuration
builder.Services.AddSpa(builder);

// Add asset proxy
builder.Services.AddFusionPortalAssetProxy(builder.Configuration);

builder.Services.AddApplicationInsightsTelemetry();

// Authorization
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("default", policy =>
    {
        policy.AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme);
        policy.RequireAuthenticatedUser();
    });
});

builder.Services.AddHttpContextAccessor();

builder.Services.AddApplicationInsightsTelemetry();

var app = builder.Build();

// Ensure proper redirect urls in Radix. Without this, the auth redirects uses HTTP instead of HTTPS
app.Use((context, next) =>
{
    context.Request.Scheme = "https";
    return next();
});

// Used for Radix
app.UseCookiePolicy(new CookiePolicyOptions
{
    Secure = CookieSecurePolicy.Always
});

app.UseAuthentication();

app.UseRouting();

app.UseAuthorization();

// Unless request matches any of these endpoint, the SPA will take control
app.UseEndpoints(endpoints =>
{
    endpoints.MapDefaultControllerRoute();
    endpoints.MapFusionPortalAssetProxy();

    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller=Bundle}/{action=Index}/{id?}");
});

// SPA Configuration
app.MapSpaEndpoints(builder);

app.Run();
