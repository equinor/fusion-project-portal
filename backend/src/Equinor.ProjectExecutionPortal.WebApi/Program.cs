using Equinor.ProjectExecutionPortal.WebApi;
using Equinor.ProjectExecutionPortal.WebApi.DiModules;
using Fusion.Integration;
using Fusion.Integration.Http;
using Microsoft.Identity.Web;

//const string ServiceName = "project-execution-portal";

var builder = WebApplication.CreateBuilder(args);

//FusionWebHostBuilder.BuildWebHost<Program>(args, setup =>
//{
//    setup
//        .WithServiceName(ServiceName)
//    .UseDefaultKeyVaultSettings();
//})
//    .Build()
//    .Run();

// Add services to the container.

// Add cookie auth
builder.Services
    .AddAuthentication(/*OpenIdConnectDefaults.AuthenticationScheme*/)
    .AddMicrosoftIdentityWebApp(builder.Configuration)
    .EnableTokenAcquisitionToCallDownstreamApi()
    .AddInMemoryTokenCaches();

// Add bearer auth
builder.Services.AddAuthentication()
    .AddMicrosoftIdentityWebApi(builder.Configuration)
    .EnableTokenAcquisitionToCallDownstreamApi();

// Add asset proxy
//builder.Services.AddFusionPortalAssetProxy(builder.Configuration);

// Add fusion integration
builder.Services.AddFusionIntegration(f =>
{
    f.UseServiceInformation("Fusion.Project.Portal", "Dev");
    f.UseDefaultEndpointResolver("ci");
    f.UseMsalTokenProvider();
});

// Add http client to the fusion portal api. This can be fetched from the IHttpClientFactory
builder.Services.AddFusionIntegrationHttpClient(PortalConstants.HttpClientPortal, s =>
{
    s.UseDelegateToken = true;
    s.UseFusionEndpoint(FusionEndpoint.Portal);
});

//builder.Services.AddFusionInfrastructure(builder.Configuration, fusion =>
//{
//    fusion.AddDefaults(FusionServiceEndpoint.Portal);

//    //fusion.AddDefaultAuthentication()
//    //    .AddMainPortalSigning(builder.Configuration)
//    //    .AddDiscoveryAuthenticationSchema(builder.Configuration)
//    //    .AddPortalAuthorizationPolicies();

//    fusion.AddApiVersioning();

//    fusion.AddSwagger("Project Portal API", swagger => swagger
//        .AddApiVersion(1)
//        .AddApiPreview());

//    fusion.AddFluentValidation<Program>();

//    fusion.AddFusionHealthChecks<ProjectExecutionPortalContext>();
//    fusion.EnableReadOnlyMode();
//    fusion.AddStorageClients();

//    // We must override the token provider to handle cookie requests.
//    builder.Services.AddSingleton<IFusionTokenProvider, PortalTokenProviderProxy>();
//});

builder.Services.AddRazorPages();
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddApplicationInsightsTelemetry();

builder.Services.AddApplicationModules(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    // Set up routes that the asset proxy should forward.
    //endpoints.MapFusionPortalAssetProxy();

    endpoints.MapControllers();
    endpoints.MapRazorPages();
});

app.Run();
