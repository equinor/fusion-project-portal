using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers.Admin
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiVersion("0.1")]
    [Route("api/admin")]
    public class WorkSurfaceAdminController : ApiControllerBase
    {
        [HttpGet("work-surfaces")]
        public IActionResult WorkSurfaces()
        {
            return Json("all work surfaces");
        }

        [HttpPost("work-surfaces")]
        public IActionResult CreateWorkSurface([FromBody] string name)
        {
            return Json($"{name} work surface created");
        }

        [HttpGet("work-surfaces/{workSurfaceId:guid}/apps")]
        public IActionResult WorkSurfaceApps([FromRoute] Guid workSurfaceId)
        {
            return Json($"apps for work surface {workSurfaceId}");
        }

        [HttpPost("work-surfaces/{workSurfaceId:guid}/apps")]
        public IActionResult AddAppToWorkSurface([FromRoute] Guid workSurfaceId, [FromBody] string appKey)
        {
            return Json($"{appKey} added to work surface {workSurfaceId}");
        }

        [HttpDelete("work-surfaces/{workSurfaceId:guid}/apps/{appKey}")]
        public IActionResult RemoveAppFromWorkSurface([FromRoute] Guid workSurfaceId, [FromRoute] string appKey)
        {
            return Json($"{appKey} Removed from {workSurfaceId}");
        }
    }
}
