using System.Text.Json.Serialization;
using Equinor.ProjectExecutionPortal.WebApi;
using Equinor.ProjectExecutionPortal.WebApi.AssetProxy;
using Equinor.ProjectExecutionPortal.WebApi.DiModules;
using Fusion.Integration;
using Fusion.Integration.Http;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Identity.Web;

const string AllowAllOriginsCorsPolicy = "AllowAllOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(AllowAllOriginsCorsPolicy,
        policyBuilder =>
        {
            policyBuilder
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod()
                .WithExposedHeaders("Allow");
        });
});

// Add cookie auth
//builder.Services
//    .AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
//    .AddMicrosoftIdentityWebApp(builder.Configuration)
//    .EnableTokenAcquisitionToCallDownstreamApi()
//    .AddInMemoryTokenCaches();

//Add bearer auth
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration)
    .EnableTokenAcquisitionToCallDownstreamApi()
    .AddInMemoryTokenCaches();

// Add asset proxy
builder.Services.AddFusionPortalAssetProxy(builder.Configuration);

// Add fusion integration
builder.Services.AddFusionIntegration(f =>
{
    f.UseServiceInformation("Fusion.Project.Portal", "Dev");
    f.UseDefaultEndpointResolver("ci");
    f.UseMsalTokenProvider();
    f.DisableClaimsTransformation();
});

// Add http client to the fusion portal api. This can be fetched from the IHttpClientFactory
builder.Services.AddFusionIntegrationHttpClient(PortalConstants.HttpClientPortal, s =>
{
    s.UseDelegateToken = true;
    s.UseFusionEndpoint(FusionEndpoint.Portal);
});

builder.Services.AddRazorPages();

builder.Services.AddControllers(config =>
    {
        var policy = new AuthorizationPolicyBuilder()
            .RequireAuthenticatedUser()
            .Build();
        config.Filters.Add(new AuthorizeFilter(policy));
    })
    .AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddApplicationInsightsTelemetry();

builder.Services.AddApplicationModules(builder.Configuration);

var app = builder.Build();

app.UseCors(AllowAllOriginsCorsPolicy);

// Always enable swagger
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    // Set up routes that the asset proxy should forward.
    endpoints.MapFusionPortalAssetProxy();

    endpoints.MapControllers();
    endpoints.MapRazorPages();
});

app.Run();
