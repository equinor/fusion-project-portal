using Equinor.ProjectExecutionPortal.WebApi.Authorization.Requirements;
using Fusion;
using Microsoft.AspNetCore.Authorization;

namespace Equinor.ProjectExecutionPortal.WebApi.Authorization
{
    public static class AuthorizationExtensions
    {
        /// <summary>
        /// The user is admin or owner of any app.
        /// </summary>
        public static AuthorizationRequirementsBuilder OrIsAppAdminOrOwner(this AuthorizationRequirementsBuilder builder)
        {
            builder.Optional.Add(auth => auth.AuthorizeAsync(builder.User, null, new PortalAdminOrOwnerRequirement()));
            return builder;
        }
    }
}
