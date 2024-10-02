//using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;

//namespace Equinor.ProjectExecutionPortal.WebApi.Controllers
//{
//    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
//    [ApiVersion("0.1")]
//    [Route("api/bundles")]
//    [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
//    public class BundleController : ApiControllerBase
//    {
//        [AllowAnonymous]
//        [HttpGet("{appKey}")]
//        [HttpGet("{appKey}.js")]
//        [ProducesResponseType(StatusCodes.Status200OK)]
//        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
//        public async Task<ActionResult> FusionPortalAppBundle([FromServices] IFusionPortalApiService fusionPortalApiService, [FromRoute] string appKey)
//        {
//            try
//            {
//                var appBundle = await fusionPortalApiService.TryGetFusionPortalAppBundle(appKey);

//                return File(appBundle, "application/javascript");
//            }
//            catch (Exception ex)
//            {
//                return FusionApiError.NotFound(appKey, ex.Message);
//            }
//        }
//    }
//}
