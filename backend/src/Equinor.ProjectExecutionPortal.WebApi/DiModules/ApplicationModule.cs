using System.Reflection;
using Equinor.ProjectExecutionPortal.Application;
using Equinor.ProjectExecutionPortal.Application.Events.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Events.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Time;
using Equinor.ProjectExecutionPortal.Domain.Interfaces;
using Equinor.ProjectExecutionPortal.Infrastructure;
using Equinor.ProjectExecutionPortal.WebApi.Authentication;
using Equinor.ProjectExecutionPortal.WebApi.Authorization.Requirements;
using Equinor.ProjectExecutionPortal.WebApi.Behaviors;
using Equinor.ProjectExecutionPortal.WebApi.Misc;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Identity.Client;

namespace Equinor.ProjectExecutionPortal.WebApi.DiModules;

public static class ApplicationModule
{
    public static void AddApplicationModules(this IServiceCollection services, IConfiguration configuration)
    {
        TimeService.SetProvider(new SystemTimeProvider());

        var applicationAssembly = typeof(IApplicationMarker).GetTypeInfo().Assembly;

        services.Configure<CacheOptions>(configuration.GetSection("CacheOptions"));
        services.Configure<AuthenticatorOptions>(configuration.GetSection("Authenticator"));

        services.AddAuthorization(options =>
        {
            options.AddPolicy("default", policy =>
            {
                policy.AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme);
                policy.RequireAuthenticatedUser();
            });
        });

        services.AddInfrastructureModules(configuration);

        services.AddHttpContextAccessor();
        services.AddMediatR(applicationAssembly);
        //services.AddAutoMapper(applicationAssembly);

        // Transient - Created each time it is requested from the service container
        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));

        // Scoped - Created once per client request (connection)
        services.AddScoped<CurrentUserProvider>();
        services.AddScoped<ICurrentUserProvider>(x => x.GetRequiredService<CurrentUserProvider>());
        services.AddScoped<ICurrentUserSetter>(x => x.GetRequiredService<CurrentUserProvider>());

        services.AddScoped<IEventDispatcher, EventDispatcher>();

        services.AddScoped<Authenticator>();
        services.AddScoped<IBearerTokenProvider>(x => x.GetRequiredService<Authenticator>());
        services.AddScoped<IBearerTokenSetter>(x => x.GetRequiredService<Authenticator>());
        services.AddScoped<IAuthenticator>(x => x.GetRequiredService<Authenticator>());

        // Services

        // Integrations

        // Validators

        // Authorization handlers

        services.AddScoped<IAuthorizationHandler, PortalAdminOrOwnerRequirement.Handler>();


        // Singleton - Created the first time they are requested
    }
}
