using Microsoft.AspNetCore.Authorization;

namespace Equinor.ProjectExecutionPortal.WebApi.Authorization;

public static class Policies
{
    public static class ProjectPortal
    {
        public const string Admin = "ProjectPortal.Admin";
    }

    public static void UseApplicationPolicies(this AuthorizationOptions options)
    {
        options.AddPolicy(ProjectPortal.Admin, builder => builder
            .RequireRole(Scopes.ProjectPortalAdmin)
        );
    }
}