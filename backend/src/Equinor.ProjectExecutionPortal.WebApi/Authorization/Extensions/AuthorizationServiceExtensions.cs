using Microsoft.AspNetCore.Authorization;

namespace Equinor.ProjectExecutionPortal.WebApi.Authorization.Extensions;

public static class AuthorizationServiceExtensions
{
    public static async Task<AuthorizationResult> RequireAuthorizationAsync(this HttpRequest request, object? resource, string policy)
    {
        var authorizationService = request.HttpContext.RequestServices.GetRequiredService<IAuthorizationService>();
        var user = request.HttpContext.User;

        return await authorizationService.AuthorizeAsync(user, resource, policy);
    }
}
