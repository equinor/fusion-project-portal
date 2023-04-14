﻿using Equinor.ProjectExecutionPortal.ClientBackend;
using Equinor.ProjectExecutionPortal.ClientBackend.AssetProxy;
using Fusion.Integration;
using Fusion.Integration.Http;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.Identity.Client;
using Microsoft.Identity.Web;

var builder = WebApplication.CreateBuilder(args);

// AppSettings configuration
builder.Services.Configure<CacheOptions>(builder.Configuration.GetSection("CacheOptions"));
builder.Services.Configure<AssetProxyOptions>(builder.Configuration.GetSection("AssetProxy"));

// Add cookie auth
builder.Services
    .AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApp(builder.Configuration)
    .EnableTokenAcquisitionToCallDownstreamApi(new string[] { })
    .AddInMemoryTokenCaches();

// Add bearer auth
//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//    .AddMicrosoftIdentityWebApi(builder.Configuration)
//    .EnableTokenAcquisitionToCallDownstreamApi()
//    .AddInMemoryTokenCaches();

// Authorization
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("default", policy =>
    {
        policy.AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme);
        policy.RequireAuthenticatedUser();
    });
});

// Add fusion integration
builder.Services.AddFusionIntegration(fusionIntegrationConfig =>
{
    fusionIntegrationConfig.UseServiceInformation("Fusion.Project.Portal", "Dev");
    fusionIntegrationConfig.UseDefaultEndpointResolver("ci");
    fusionIntegrationConfig.UseMsalTokenProvider();
    fusionIntegrationConfig.DisableClaimsTransformation();
});

// Add http client to the fusion portal api. This can be fetched from the IHttpClientFactory
builder.Services.AddFusionIntegrationHttpClient(PortalConstants.HttpClientPortal, fusionHttpClientOptions =>
{
    fusionHttpClientOptions.UseDelegateToken = true;
    fusionHttpClientOptions.UseFusionEndpoint(FusionEndpoint.Portal);
});

builder.Services.AddControllersWithViews();

// Add asset proxy
builder.Services.AddFusionPortalAssetProxy(builder.Configuration);

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

//app.UseDefaultFiles(); // For static redirect
app.UseStaticFiles();

app.UseAuthentication();

app.UseRouting();

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    // Set up routes that the asset proxy should forward.
    endpoints.MapFusionPortalAssetProxy();
});

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Main}/{action=Index}/{id?}");

app.Run();
