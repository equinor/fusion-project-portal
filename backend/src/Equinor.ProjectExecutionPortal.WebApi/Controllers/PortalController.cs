using Equinor.ProjectExecutionPortal.Application.Queries.Portal.GetPortalWithApps;
using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps.Models;
using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps;
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

            if (portalDto == null)
            {
                return FusionApiError.NotFound("Portal", "Could not find portal");
            }

            return new ApiPortal(portalDto);
        }

        // TODO: Used mainly during development. Remove afterwards
        [HttpGet("fusion/{externalId}")]
        public async Task<ActionResult<FusionContext>> GetFusionContext(string externalId)
        {
            // External id eg: FC5FFCBC-392F-4D7E-BB14-79A006579337
            var contextIdentifier = ContextIdentifier.FromExternalId(externalId);
            var context = await ContextResolver.ResolveContextAsync(contextIdentifier, FusionContextType.ProjectMaster);

            if (context == null)
            {
                return FusionApiError.NotFound(externalId, "Could not find context by external id");
            }

            return context;
        }

        [HttpGet("fusion/apps")]
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
