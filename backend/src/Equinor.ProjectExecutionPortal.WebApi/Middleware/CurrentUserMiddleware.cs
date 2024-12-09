using Equinor.ProjectExecutionPortal.WebApi.Authorization.Extensions;
using Equinor.ProjectExecutionPortal.WebApi.Misc;

namespace Equinor.ProjectExecutionPortal.WebApi.Middleware;

public class CurrentUserMiddleware
{
    private readonly RequestDelegate _next;

    public CurrentUserMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(
        HttpContext context,
        IHttpContextAccessor httpContextAccessor,
        ICurrentUserSetter currentUserSetter,
        ILogger<CurrentUserMiddleware> logger)
    {
        logger.LogInformation($"----- {GetType().Name} start");

        var oId = httpContextAccessor.HttpContext?.User.Claims.TryGetOid();

        if (oId.HasValue)
        {
            currentUserSetter.SetCurrentUserOid(oId.Value);
        }

        logger.LogInformation($"----- {GetType().Name} complete");
        // Call the next delegate/middleware in the pipeline
        await _next(context);
    }
}
