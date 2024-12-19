using Equinor.ProjectExecutionPortal.WebApi.Authorization.Requirements;
using Microsoft.AspNetCore.Authorization;

namespace Equinor.ProjectExecutionPortal.WebApi.Authorization;

public static class Policies
{
    public static class Global
    {
        public const string Read = "Global.Read";
        public const string ManagePortal = "Global.ManagePortal";
        public const string Administrate = "Global.Administrate";
    }

    public static void UseApplicationPolicies(this AuthorizationOptions options)
    {
        options.AddPolicy(Global.Read, builder => builder
            .RequireAuthenticatedUser());

        options.AddPolicy(Global.ManagePortal, builder => builder
            .AddRequirements(new PortalManageRequirement()));

        options.AddPolicy(Global.Administrate, builder => builder
            .RequireRole(Scopes.ProjectPortalAdmin));
    }
}
