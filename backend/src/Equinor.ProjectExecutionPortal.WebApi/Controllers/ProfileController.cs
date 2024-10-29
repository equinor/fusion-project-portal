using Equinor.ProjectExecutionPortal.WebApi.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiVersion("0.1")]
    [Route("api/profile")]
    public class ProfileController : ApiControllerBase
    {
        [HttpOptions("admin")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public IActionResult Options()
        {
            return Ok();
        }
    }
}
