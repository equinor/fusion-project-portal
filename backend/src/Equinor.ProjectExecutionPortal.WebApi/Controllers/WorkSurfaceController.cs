using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps;
using Fusion.Integration;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers
{
    [ApiVersion("0.1")]
    [Route("api/work-surfaces/")]
    public class WorkSurfaceController : ApiControllerBase
    {
        [HttpGet("")]
        public async Task<IActionResult> WorkSurfaces()
        {
            var contextIdentifier = ContextIdentifier.FromExternalId("FC5FFCBC-392F-4D7E-BB14-79A006579337");
            var context = await contextResolver.ResolveContextAsync(contextIdentifier, FusionContextType.ProjectMaster);

            return Json("work surfaces for portal");
        }

        //[HttpGet("{workSurfaceId}/contexts/{contextId}/apps")]
        [HttpGet("{workSurfaceId}/apps")]
        public IActionResult Apps([FromRoute] Guid workSurfaceId)
        {
            // TODO: Resolve
            // TODO list of apps added to this specific work surface

            return Json("yo");
        }

        [HttpGet("{workSurfaceId}/bundles/{appKey}")]
        [HttpGet("{workSurfaceId}/bundles/{appKey}.js")]
        public async Task<ActionResult> GetFusionPortalAppBundle(
            [FromServices] IFusionPortalApiService fusionPortalApiService,
            [FromRoute] Guid workSurfaceId,
            [FromRoute] string appKey
            )
        {
            try
            {
                // TODO: Verify that app is in work surface and context

                var appBundle = await fusionPortalApiService.TryGetFusionPortalAppBundle(appKey);

                return File(appBundle, "application/javascript");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}
