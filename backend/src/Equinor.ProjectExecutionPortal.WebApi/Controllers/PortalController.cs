using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers
{
    [ApiVersion("0.1")]
    [Route("api/portal")]
    public class PortalController : ApiControllerBase
    {
        // TODO: List phases
        [HttpGet("work-surfaces")]
        public IActionResult WorkSurfaces()
        {
            return Json("work surfaces for portal");
        }
    }
}
