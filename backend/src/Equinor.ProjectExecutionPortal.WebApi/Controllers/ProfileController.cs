using Equinor.ProjectExecutionPortal.WebApi.Authorization.Extensions;
using Fusion.AspNetCore.FluentAuthorization;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers;

[ApiVersion("1.0")]
[Route("api/profile")]
public class ProfileController : ApiControllerBase
{
    [HttpOptions("admin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> Options()
    {
        #region Authorization

        var authResult = await Request.RequireAuthorizationAsync(builder =>
        {
            builder.AlwaysAccessWhen().HasPortalsFullControl();
        });

        if (authResult.Unauthorized)
        {
            return authResult.CreateForbiddenResponse();
        }

        #endregion

        return Ok();
    }
}
