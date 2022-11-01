using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApp.GetOnboardedApps;
using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps;
using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps.Models;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers.PortalAdmin
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
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
        public async Task<ActionResult<IList<ApiOnboardedApp>>> OnboardedApps()
        {
            var onboardedAppsDto = await Mediator.Send(new GetOnboardedAppsQuery());

            return onboardedAppsDto.Select(onboardedAppDto => new ApiOnboardedApp(onboardedAppDto)).ToList();
        }

        [HttpPost("onboarded-apps")]
        public async Task<ActionResult<Guid>> OnboardApp([FromBody] ApiOnboardAppRequest request)
        {
            return await Mediator.Send(request.ToCommand());
        }
        
        [HttpDelete("onboarded-apps/{appKey}")]
        public async Task<ActionResult> RemoveOnboardedApp([FromRoute] string appKey)
        {
            var request = new ApiRemoveOnboardedAppRequest { AppKey = appKey};
            await Mediator.Send(request.ToCommand());

            return NoContent();
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
