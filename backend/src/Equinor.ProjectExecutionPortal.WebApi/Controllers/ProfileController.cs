using Equinor.ProjectExecutionPortal.WebApi.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers;

[Obsolete("To be removed")]
[ApiVersion("1.0")]
[Route("api/profile")]
public class ProfileController : ApiControllerBase
{
    [Authorize(Policy = Policies.Global.Administrate)]
    [HttpOptions("admin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public ActionResult Options()
    {
        return Ok();
    }
}
