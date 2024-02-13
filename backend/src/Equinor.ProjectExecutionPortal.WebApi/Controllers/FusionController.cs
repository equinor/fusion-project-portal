using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps.Models;
using Fusion.Integration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiVersion("0.1")]
    [Route("api/fusion")]
    public class FusionController : ApiControllerBase
    {

        [HttpGet("context/{externalId}/type/{contextType}")]
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
        public async Task<ActionResult<IList<FusionPortalAppInformation>>> GetAllFusionApps([FromServices] IAppService appService)
        {
            var apps = await appService.GetFusionApps();

            return Ok(apps.ToList());
        }

        [HttpGet("apps/{appKey}")]
        public async Task<ActionResult<FusionPortalAppInformation?>> GetFusionApp([FromRoute] string appKey, [FromServices] IAppService appService)
        {
            var fusionApp = await appService.GetFusionApp(appKey);

            return fusionApp == null ? FusionApiError.NotFound(appKey, "Could not find fusion app") : Ok(fusionApp);
        }

        [HttpGet("apps/{appKey}/config")]
        public async Task<ActionResult<FusionAppEnvironmentConfig?>> GetFusionAppConfig([FromRoute] string appKey, [FromServices] IAppService appService)
        {
            var appConfig = await appService.GetFusionAppConfig(appKey);

            return appConfig == null ? FusionApiError.NotFound(appKey, "Could not locate config for the specified appKey") : Ok(appConfig);
        }
    }
}
