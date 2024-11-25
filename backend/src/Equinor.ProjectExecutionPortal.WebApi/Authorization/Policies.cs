using Equinor.ProjectExecutionPortal.WebApi.Authorization.Requirements;
using Microsoft.AspNetCore.Authorization;

namespace Equinor.ProjectExecutionPortal.WebApi.Authorization;

public static class Policies
{
    public static class ProjectPortal
    {
        public const string Admin = "ProjectPortal.Admin";

        public static class Portal
        {
            public const string List = "ProjectPortal.Portal.List";
            public const string Read = "ProjectPortal.Portal.Read";
            public const string Create = "ProjectPortal.Portal.Create";
            public const string Update = "ProjectPortal.Portal.Update";
            public const string Delete = "ProjectPortal.Portal.Delete";
        }

    }

    public static void UseApplicationPolicies(this AuthorizationOptions options)
    {
        options.AddPolicy(ProjectPortal.Admin, builder => builder
            .RequireRole(Scopes.ProjectPortalAdmin)
        );

        options.AddPolicy(ProjectPortal.Portal.Create, builder => builder
            .RequireRole(Scopes.ProjectPortalAdmin)
        );

        options.AddPolicy(ProjectPortal.Portal.Update, builder => builder
            .RequireRole(Scopes.ProjectPortalAdmin)
            .AddRequirements(
                new PortalOwnerRequirement()));
    }
}
