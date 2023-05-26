using System.Security.Claims;
using Fusion;
using Microsoft.AspNetCore.Authorization;

namespace Equinor.ProjectExecutionPortal.WebApi.Authorization
{
    public static class IAuthorizationServiceExtensions
    {
        public static async Task RequireAuthorizationAsync(this IAuthorizationService authorizationService, ClaimsPrincipal user, object? resource, string policy)
        {
            var result = await authorizationService.AuthorizeAsync(user, resource, policy);

            if (!result.Succeeded)
            {
                throw new UnauthorizedAccessException("User is not authorized");
            }
        }

        public static async Task RequireAuthorizationAsync(this IAuthorizationService authorizationService, ClaimsPrincipal user, string policy)
        {
            var result = await authorizationService.AuthorizeAsync(user, policy);

            if (!result.Succeeded)
            {
                throw new NotAuthorizedError("User is not authorized")
                {
                    FailedRequirements = result.Failure?.FailedRequirements
                };
            }
        }

        public static async Task RequireAuthorizationAsync(this IAuthorizationService authorizationService, ClaimsPrincipal user, Action<AuthorizationRequirementsBuilder> requirements)
        {
            var auth = await authorizationService.AuthorizeAsync(user, requirements);

            if (!auth.Succeeded)
            {
                throw new NotAuthorizedError("Could not authorize user!")
                {
                    FailedRequirements = auth.Failure?.FailedRequirements
                };
            }
        }
    }
}
