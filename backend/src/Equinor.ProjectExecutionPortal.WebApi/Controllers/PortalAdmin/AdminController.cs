using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps;
using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps.Models;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers.PortalAdmin
{
    [ApiVersion("0.1")]
    [Route("api/admin")]
    public class AdminController : ApiControllerBase
    {
        [HttpGet("fusion-apps")]
        public async Task<ActionResult<IList<ApiFusionPortalAppInformation>>> GetAllFusionApps([FromServices] IFusionPortalApiService fusionPortalApiService)
        {
            try
            {
                var apps = await fusionPortalApiService.TryGetFusionPortalApps();

                return apps.ToList();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet("onboarded-apps")]
        public IActionResult OnboardedApps()
        {
            return Json("onboarded apps for portal");
        }

        [HttpPost("onboarded-apps")]
        public IActionResult OnboardApp([FromBody] string appKey)
        {
            return Json($"{appKey} onboarded");
        }

        [HttpDelete("onboarded-apps/{appKey}")]
        public IActionResult DelistApp([FromRoute] string appKey)
        {
            return Json($"{appKey} no longer onboarded");
        }

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
