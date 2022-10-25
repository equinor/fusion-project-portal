using Equinor.ProjectExecutionPortal.Application.Queries.Portal.GetPortalWithApps;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal;
using Fusion.Integration;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers
{
    [ApiVersion("0.1")]
    [Route("api/portal")]
    public class PortalController : ApiControllerBase
    {
        [HttpGet("")]
        public async Task<ActionResult<ApiPortal>> Portal()
        {
            var portalDto = await Mediator.Send(new GetPortalWithAppsQuery());

            if (portalDto == null)
            {
                return NotFound();
            }

            return new ApiPortal(portalDto);
        } 
        
        [HttpGet("work-surfaces")]
        public async Task<IActionResult> WorkSurfaces([FromServices] IFusionContextResolver contextResolver)
        {
            return Json("work surfaces for portal");
        }
    }
}
