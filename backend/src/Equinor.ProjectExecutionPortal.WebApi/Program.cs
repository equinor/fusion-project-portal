using System.Configuration;
using System.Text.Json.Serialization;
using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.WebApi.DiModules;
using Equinor.ProjectExecutionPortal.WebApi.Middleware;
using FluentValidation;
using FluentValidation.AspNetCore;
using Fusion.Infrastructure.ServiceDiscovery;
using Fusion.Integration;
using Fusion.Integration.Apps.Abstractions.Models;
using Fusion.Integration.Apps.Configuration;
using Fusion.Integration.Profile;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Identity.Web;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerUI;

const string allowAllOriginsCorsPolicy = "AllowAllOrigins";

var builder = WebApplication.CreateBuilder(args);

// Application Insights
builder.Services.AddApplicationInsightsTelemetry();

builder.Services.AddCors(options =>
{
    options.AddPolicy(allowAllOriginsCorsPolicy,
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

// Add bearer auth
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration)
    .EnableTokenAcquisitionToCallDownstreamApi()
    .AddInMemoryTokenCaches();




// Add fusion integration

// WIP. Perhaps this
//builder.Services.AddFusionInfrastructure(builder.Configuration, fusion =>
//{
//    fusion.ConfigureIntegration(i =>
//    {
//        i.AddProfileSync<ProfileSyncHandler>();
//    });
//});


builder.Services.AddFusionIntegration(fusion =>
{
    var environment = builder.Configuration.GetValue<string>("Fusion:Environment")!;

    fusion.UseServiceInformation("Fusion.Project.Portal", environment);
    fusion.UseDefaultEndpointResolver(environment);
    fusion.AddAppsClient();
    fusion.UseDefaultTokenProvider(opts =>
    {
        opts.ClientId = builder.Configuration.GetValue<string>("AzureAd:ClientId")!;
        opts.ClientSecret = builder.Configuration.GetValue<string>("AzureAd:ClientSecret");
    });
    fusion.DisableClaimsTransformation();
    //fusion.AddProfileSync<ProfileSyncHandler>(); // WIP. Or this
});

builder.Services.AddControllers(config =>
    {
        var policy = new AuthorizationPolicyBuilder()
            .RequireAuthenticatedUser()
            .Build();

        config.Filters.Add(new AuthorizeFilter(policy));
    })
    .AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<Program>();

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
                AuthorizationUrl = new Uri(builder.Configuration["Swagger:AuthorizationUrl"]!),
                TokenUrl = new Uri(builder.Configuration["Swagger:TokenUrl"]!),
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

app.UseCors(allowAllOriginsCorsPolicy);

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

app.MapControllers();

app.Run();

// Used for tests
public abstract partial class Program;
