using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiVersion("0.1")]
    [Route("api/bundles/")]
    public class BundleController : ApiControllerBase
    {
        [HttpGet("{appKey}")]
        [HttpGet("{appKey}.js")]
        public async Task<ActionResult> FusionPortalAppBundle([FromServices] IFusionPortalApiService fusionPortalApiService,[FromRoute] string appKey)
        {
            try
            {
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
