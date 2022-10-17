using Equinor.ProjectExecutionPortal.Infrastructure;
using Equinor.ProjectExecutionPortal.WebApi.Authorization;
using Equinor.ProjectExecutionPortal.WebApi.DiModules;
using Fusion;
using Fusion.Infrastructure.Internal.Application;
using Fusion.Integration.Configuration;

const string ServiceName = "project-execution-portal";

var builder = WebApplication.CreateBuilder(args);

FusionWebHostBuilder.BuildWebHost<Program>(args, setup =>
{
    setup
        .WithServiceName(ServiceName)
    .UseDefaultKeyVaultSettings();
})
    .Build()
    .Run();

// Add services to the container.

builder.Services.AddFusionInfrastructure(builder.Configuration, fusion =>
{
    fusion.AddDefaults(FusionServiceEndpoint.Portal);

    fusion.AddDefaultAuthentication()
        .AddMainPortalSigning(builder.Configuration)
        .AddDiscoveryAuthenticationSchema(builder.Configuration)
        .AddPortalAuthorizationPolicies();

    fusion.AddApiVersioning();

    fusion.AddSwagger("Project Portal API", swagger => swagger
        .AddApiVersion(1)
        .AddApiPreview());

    fusion.AddFluentValidation<Program>();

    fusion.AddFusionHealthChecks<ProjectExecutionPortalContext>();
    fusion.EnableReadOnlyMode();
    fusion.AddStorageClients();

    // We must override the token provider to handle cookie requests.
    builder.Services.AddSingleton<IFusionTokenProvider, PortalTokenProviderProxy>();
});
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddApplicationModules(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
