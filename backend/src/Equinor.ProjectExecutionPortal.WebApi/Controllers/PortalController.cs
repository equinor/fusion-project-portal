using Equinor.ProjectExecutionPortal.Application.Queries.Portal.GetPortalWithApps;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers
{
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
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
                return FusionApiError.NotFound("Portal", "Could not find portal");
            }

            return new ApiPortal(portalDto);
        }
    }
}
