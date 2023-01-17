using Equinor.ProjectExecutionPortal.ClientBackend;
using Equinor.ProjectExecutionPortal.ClientBackend.AssetProxy;
using Equinor.ProjectExecutionPortal.ClientBackend.DiModules;
using Fusion.Integration;
using Fusion.Integration.Http;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.Identity.Web;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Add asset proxy
builder.Services.AddFusionPortalAssetProxy(builder.Configuration);

//Add bearer auth
//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//    .AddMicrosoftIdentityWebApi(builder.Configuration)
//    .EnableTokenAcquisitionToCallDownstreamApi()
//    .AddInMemoryTokenCaches();

// Add cookie auth
builder.Services
    .AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
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
builder.Services.AddFusionIntegrationHttpClient(PortalConstants.HttpClientPortal, fusionHttpClientOptions =>
{
    fusionHttpClientOptions.UseDelegateToken = true;
    fusionHttpClientOptions.UseFusionEndpoint(FusionEndpoint.Portal);
});

// Custom modules
builder.Services.AddApplicationModules(builder.Configuration);

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
app.UseStaticFiles();

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
