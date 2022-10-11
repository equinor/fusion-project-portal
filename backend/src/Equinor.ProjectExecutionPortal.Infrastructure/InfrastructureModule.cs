﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Equinor.ProjectExecutionPortal.Infrastructure;

public static class InfrastructureModule
{
    public static IServiceCollection AddInfrastructureModules(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("ProjectExecutionPortalDbContext");

        services.AddDbContext<IReadWriteContext, ProjectExecutionPortalContext>(options =>
            options.UseSqlServer(connectionString,
                b => b.MigrationsAssembly(typeof(ProjectExecutionPortalContext).Assembly.FullName)
                    //.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery) // For performance reasons
                )
        );

        return services;
    }
}
