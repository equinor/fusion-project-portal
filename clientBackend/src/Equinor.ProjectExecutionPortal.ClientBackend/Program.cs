using Equinor.ProjectExecutionPortal.ClientBackend;
using Equinor.ProjectExecutionPortal.ClientBackend.AssetProxy;
using Fusion.Integration;
using Fusion.Integration.Http;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.CookiePolicy;
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
//if (!app.Environment.IsDevelopment())
//{
//    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
//    app.UseHsts();
//}

//app.UseHttpsRedirection();
//app.UseDefaultFiles(); // For static redirect
app.UseStaticFiles();

app.UseCookiePolicy(new CookiePolicyOptions
{
    //HttpOnly = HttpOnlyPolicy.Always,
    //MinimumSameSitePolicy = SameSiteMode.None,
    Secure = CookieSecurePolicy.Always
});

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
