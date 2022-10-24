﻿using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers
{
    [ApiVersion("0.1")]
    [Route("api/work-surface")]
    public class WorkSurfaceController : ApiControllerBase
    {
        [HttpGet("{workSurfaceId}/apps")]
        public IActionResult Apps([FromRoute] Guid workSurfaceId)
        {
            // TODO list of whitelisted bundles

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
                // TODO: Verify that app is in work surface

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
