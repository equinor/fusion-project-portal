using System.Text.Json.Serialization;
using Equinor.ProjectExecutionPortal.WebApi.AssetProxy;
using Equinor.ProjectExecutionPortal.WebApi.DiModules;
using Equinor.ProjectExecutionPortal.WebApi.Middleware;
using FluentValidation.AspNetCore;
using Fusion.Integration;
using Fusion.Integration.Apps.Configuration;
using Fusion.Integration.Http;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Identity.Web;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerUI;
using Constants = Equinor.ProjectExecutionPortal.WebApi.Constants;

const string AllowAllOriginsCorsPolicy = "AllowAllOrigins";

var builder = WebApplication.CreateBuilder(args);

// Application Insights
builder.Services.AddApplicationInsightsTelemetry();

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

builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
});

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
    var environment = builder.Configuration.GetValue<string>("Fusion:Environment" ?? "ci");
    f.UseServiceInformation("Fusion.Project.Portal", environment);
    f.UseDefaultEndpointResolver(environment);
    f.AddAppsClient();
    f.UseDefaultTokenProvider(opts =>
    {
        opts.ClientId = builder.Configuration.GetValue<string>("AzureAd:ClientId");
        opts.ClientSecret = builder.Configuration.GetValue<string>("AzureAd:ClientSecret");
    });
    f.DisableClaimsTransformation();
});

// Add http client to the fusion portal api. This can be fetched from the IHttpClientFactory
builder.Services.AddFusionIntegrationHttpClient(Constants.HttpClientPortal, s =>
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

builder.Services.AddFluentValidation(c =>
 {
     c.RegisterValidatorsFromAssemblyContaining<Program>();
 });

builder.Services.AddEndpointsApiExplorer();

// Swagger
builder.Services.AddSwaggerGen(c =>
{
    var scopes = new Dictionary<string, string>
    {
        { $"api://{builder.Configuration["Swagger:ClientId"]}/{builder.Configuration["Swagger:Scope"]}", "" }
    };

    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Fusion Project Portal", Version = "v1" });

    c.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.OAuth2,
        Flows = new OpenApiOAuthFlows
        {
            Implicit = new OpenApiOAuthFlow
            {
                AuthorizationUrl = new Uri(builder.Configuration["Swagger:AuthorizationUrl"]),
                TokenUrl = new Uri(builder.Configuration["Swagger:TokenUrl"]),
                Scopes = scopes
            }
        }
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement {
        {
            new OpenApiSecurityScheme {
                Reference = new OpenApiReference {
                    Type = ReferenceType.SecurityScheme,
                    Id = "oauth2"
                },
                Scheme = "oauth2",
                Name = "oauth2",
                In = ParameterLocation.Header
            },
            new List <string> ()
        }
    });
});

builder.Services.AddApplicationModules(builder.Configuration);
builder.Services.AddApplicationServicesModules();
builder.Services.AddCacheModules();

var app = builder.Build();

app.UseCors(AllowAllOriginsCorsPolicy);

// Use Swagger in all environments
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Fusion Project Portal");
    c.DocExpansion(DocExpansion.List);
    c.DisplayRequestDuration();
    c.OAuthAppName("Fusion Project Portal v1");
    c.OAuthClientId(builder.Configuration["Swagger:ClientId"]);
});

app.UseResponseCompression();

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.UseMiddleware<CurrentUserMiddleware>();

app.UseEndpoints(endpoints =>
{
    // Set up routes that the asset proxy should forward.
    endpoints.MapFusionPortalAssetProxy();

    endpoints.MapControllers();
    endpoints.MapRazorPages();
});

app.Run();

// Used for tests
public partial class Program
{ }
