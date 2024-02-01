using Equinor.ProjectExecutionPortal.Application.Queries.Portals.GetPortalWithApps;
using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps.Models;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal;
using Fusion.Integration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiVersion("0.1")]
    [Route("api/portal")]
    public class PortalController : ApiControllerBase
    {
        [HttpGet("")]
        public async Task<ActionResult<ApiPortal>> Portal()
        {
            var portalDto = await Mediator.Send(new GetPortalWithAppsQuery());

            return portalDto == null ? FusionApiError.NotFound("Portal", "Could not find portal") : Ok(new ApiPortal(portalDto));
        }
    }
}
