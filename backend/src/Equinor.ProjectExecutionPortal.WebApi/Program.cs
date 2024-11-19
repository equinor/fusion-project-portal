using System.Text.Json.Serialization;
using Equinor.ProjectExecutionPortal.WebApi.DiModules;
using Equinor.ProjectExecutionPortal.WebApi.Middleware;
using FluentValidation;
using FluentValidation.AspNetCore;
using Fusion.Integration.Apps.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.Identity.Web;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerUI;

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

// Add fusion integration
builder.Services.AddFusionIntegration(f =>
{
    var environment = builder.Configuration.GetValue<string>("Fusion:Environment")!;

    f.UseServiceInformation("Fusion.Project.Portal", environment);
    f.UseDefaultEndpointResolver(environment);
    f.AddAppsClient();
    f.UseDefaultTokenProvider(opts =>
    {
        opts.ClientId = builder.Configuration.GetValue<string>("AzureAd:ClientId")!;
        opts.ClientSecret = builder.Configuration.GetValue<string>("AzureAd:ClientSecret");
    });
    f.DisableClaimsTransformation();
});

builder.Services.AddApiVersioning(options =>
{
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.ReportApiVersions = true;
    options.ApiVersionReader = ApiVersionReader.Combine(new QueryStringApiVersionReader("X-api-version"));
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

// Swagger
builder.Services.AddSwaggerGen(c =>
{
    var scopes = new Dictionary<string, string>
    {
        { $"api://{builder.Configuration["Swagger:ClientId"]}/{builder.Configuration["Swagger:Scope"]}", "" }
    };

    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Fusion Project Portal - v1", Version = "v1" });

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

app.MapControllers();

app.Run();

// Used for tests
public abstract partial class Program;
