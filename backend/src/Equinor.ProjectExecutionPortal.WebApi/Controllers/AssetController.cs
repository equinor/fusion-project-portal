using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiVersion("0.1")]
    [Route("/assets")]
    public class AssetController : ApiControllerBase
    {
        //[HttpGet("{id}")]
        //public async Task<ActionResult> Asset(
        //    [FromServices] IFusionPortalApiService fusionPortalApiService,
        //    [FromRoute] Guid workSurfaceId,
        //    [FromRoute] string appKey
        //    )
        //{
        //    try
        //    {
        //    }
        //    catch (Exception e)
        //    {
        //        Console.WriteLine(e);
        //        throw;
        //    }
        //}
    }
}
