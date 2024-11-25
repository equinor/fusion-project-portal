using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Equinor.ProjectExecutionPortal.WebApi.Authorization.Extensions
{
    public static class AuthorizationServiceExtensions
    {
        public static async Task RequireAuthorizationAsync(this IAuthorizationService authorizationService, ClaimsPrincipal user, object? resource, string policy)
        {
            var result = await authorizationService.AuthorizeAsync(user, resource, policy);

            if (!result.Succeeded)
            {
                throw new UnauthorizedAccessException("User is not authorized");
            }
        }
    }
}
