using System.Text.Json.Serialization;
using Equinor.ProjectExecutionPortal.ClientBackend;
using Equinor.ProjectExecutionPortal.ClientBackend.AssetProxy;
using Fusion.Integration;
using Fusion.Integration.Http;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Identity.Client;
using Microsoft.Identity.Web;

var builder = WebApplication.CreateBuilder(args);

// AppSettings configuration
builder.Services.Configure<CacheOptions>(builder.Configuration.GetSection("CacheOptions"));
builder.Services.Configure<AssetProxyOptions>(builder.Configuration.GetSection("AssetProxy"));

// TODO: https://weblog.west-wind.com/posts/2022/Mar/29/Combining-Bearer-Token-and-Cookie-Auth-in-ASPNET
// https://medium.com/@niteshsinghal85/how-to-support-multiple-authentication-scheme-in-asp-net-core-api-581e47e38de3
// https://stackoverflow.com/questions/68081122/getting-access-token-to-call-an-api-from-my-asp-net-core-5-mvc-web-app

// Add cookie auth
builder.Services
    .AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApp(builder.Configuration)
    .EnableTokenAcquisitionToCallDownstreamApi(new string[] {  })
    .AddInMemoryTokenCaches();

// Add bearer auth
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration)
    .EnableTokenAcquisitionToCallDownstreamApi()
    .AddInMemoryTokenCaches();

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

// .....................................

builder.Services.AddControllersWithViews(config =>
    {
        //var policy = new AuthorizationPolicyBuilder()
        //    .RequireAuthenticatedUser()
        //    .Build();
        //config.Filters.Add(new AuthorizeFilter(policy));
    });

// Add asset proxy
builder.Services.AddFusionPortalAssetProxy(builder.Configuration);

builder.Services.AddHttpContextAccessor();

builder.Services.AddApplicationInsightsTelemetry();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Main/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
//app.UseDefaultFiles(); // For static redirect
app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.UseRouting();



app.UseEndpoints(endpoints =>
{
    // Set up routes that the asset proxy should forward.
    endpoints.MapFusionPortalAssetProxy();
});

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Main}/{action=Index}/{id?}");

app.Run();
