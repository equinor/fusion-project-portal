using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps;
using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers.Admin
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiVersion("0.1")]
    [Route("api/admin")]
    public class FusionAppAdminController : ApiControllerBase
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
    }
}
