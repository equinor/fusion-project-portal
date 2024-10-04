using Equinor.ProjectExecutionPortal.Application.Services.FusionAppsService;
using Fusion.Integration;
using Fusion.Integration.Apps.Abstractions.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers
{
    // TODO: This controller should be removed and replaced with the ClientBackend proxy
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiVersion("0.1")]
    [Route("api/fusion")]
    public class FusionController : ApiControllerBase
    {
        [HttpGet("context/{externalId}/type/{contextType}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<FusionContext>> GetFusionContext([FromRoute] string externalId, string contextType)
        {
            var fusionContextType = FusionContextType.Resolve(contextType);

            if (fusionContextType == null)
            {
                return FusionApiError.NotFound(contextType, "Could not resolve context type");
            }

            var contextIdentifier = ContextIdentifier.FromExternalId(externalId);
            var context = await ContextResolver.ResolveContextAsync(contextIdentifier, fusionContextType);

            return context == null ? FusionApiError.NotFound(externalId, "Could not find context by external id") : Ok(context);
        }

        [HttpGet("context-types")]
        public ActionResult<List<FusionContextType>> GetAllFusionContextTypes()
        {
            return Ok(FusionContextType.AllNames.ToList());
        }

        [HttpGet("apps")]
        public async Task<ActionResult<IList<App>>> GetAllFusionApps([FromServices] IFusionAppsService fusionAppsService)
        {
            var apps = await fusionAppsService.GetFusionApps();

            return Ok(apps.ToList());
        }

        [HttpGet("apps/{appKey}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<App?>> GetFusionApp([FromRoute] string appKey, [FromServices] IFusionAppsService fusionAppsService)
        {
            var fusionApp = await fusionAppsService.GetFusionApp(appKey);

            return fusionApp == null ? FusionApiError.NotFound(appKey, "Could not find fusion app") : Ok(fusionApp);
        }

        [HttpGet("apps/{appKey}/config")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<AppConfiguration?>> GetFusionAppConfig([FromRoute] string appKey, [FromServices] IFusionAppsService fusionAppsService)
        {
            var appConfig = await fusionAppsService.GetFusionAppConfig(appKey);

            return appConfig == null ? FusionApiError.NotFound(appKey, "Could not locate config for the specified appKey") : Ok(appConfig);
        }
    }
}
