﻿using Equinor.ProjectExecutionPortal.Application.Queries.Portals.GetPortalWithApps;
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

            if (portalDto == null)
            {
                return FusionApiError.NotFound("Portal", "Could not find portal");
            }

            return Ok(new ApiPortal(portalDto));
        }

        [HttpGet("fusion/contexts/{externalId}")]
        public async Task<ActionResult<FusionContext>> GetFusionContext([FromRoute] string externalId)
        {
            var contextIdentifier = ContextIdentifier.FromExternalId(externalId);
            var context = await ContextResolver.ResolveContextAsync(contextIdentifier, FusionContextType.ProjectMaster);

            if (context == null)
            {
                return FusionApiError.NotFound(externalId, "Could not find context by external id");
            }

            return Ok(context);
        }

        [HttpGet("fusion/apps")]
        public async Task<ActionResult<IList<FusionPortalAppInformation>>> GetAllFusionApps([FromServices] IAppService appService)
        {
            var apps = await appService.GetFusionApps();

            return Ok(apps.ToList());
        }

        [HttpGet("fusion/apps/{appKey}")]
        public async Task<ActionResult<FusionPortalAppInformation?>> GetFusionApp([FromRoute] string appKey, [FromServices] IAppService appService)
        {
            return await appService.GetFusionApp(appKey);
        }

        [HttpGet("fusion/apps/{appKey}/config")]
        public async Task<ActionResult<FusionAppEnvironmentConfig?>> GetFusionAppConfig([FromRoute] string appKey, [FromServices] IAppService appService)
        {
            var appConfig = await appService.GetFusionAppConfig(appKey);

            if (appConfig == null)
            {
                return FusionApiError.NotFound(appKey, "Could not locate config for the specified appKey");
            }

            return Ok(appConfig);
        }
    }
}
