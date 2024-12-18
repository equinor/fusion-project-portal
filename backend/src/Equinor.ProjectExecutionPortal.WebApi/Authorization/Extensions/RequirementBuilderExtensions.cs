﻿using Equinor.ProjectExecutionPortal.WebApi.Authorization.Requirements;
using Fusion.AspNetCore.FluentAuthorization;
using Microsoft.AspNetCore.Authorization;

namespace Equinor.ProjectExecutionPortal.WebApi.Authorization.Extensions;

public static class ApplicationsRequirementBuilderExtensions
{
    public static IAuthorizationRequirementRule HasPortalsFullControl(this IAuthorizationRequirementRule builder)
    {
        builder.OrGlobalRole(Scopes.ProjectPortalAdmin);

        return builder;
    }

    public static IAuthorizationRequirementRule BePortalAdmin(this IAuthorizationRequirementRule builder, Guid portalId)
    {
        builder.AddRule(portalId, new PortalAdminRequirement());

        return builder;
    }

    private static IAuthorizationRequirementRule OrGlobalRole(this IAuthorizationRequirementRule builder, params string[] scopes)
    {
        var policy = new AuthorizationPolicyBuilder()
            .RequireAssertion(c => scopes.Any(role => c.User.IsInRole(role)))
            .Build();

        builder.AddRule((auth, user) => auth.AuthorizeAsync(user, policy));

        return builder;
    }
}
