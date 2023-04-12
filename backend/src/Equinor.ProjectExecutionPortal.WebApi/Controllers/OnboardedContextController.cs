﻿using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedContext.GetOnboardedContext;
using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedContext.GetOnboardedContexts;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedContext;
using Fusion.Integration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiVersion("0.1")]
    [Route("api/onboarded-contexts")]
    public class OnboardedContextController : ApiControllerBase
    {
        [HttpGet("")]
        public async Task<ActionResult<IList<ApiOnboardedContext>>> OboardedContexts()
        {
            var onboardedContextsDto = await Mediator.Send(new GetOnboardedContextsQuery());

            return onboardedContextsDto.Select(onboardedContextDto => new ApiOnboardedContext(onboardedContextDto)).ToList();
        }

        [HttpGet("{externalContextId}")]
        public async Task<ActionResult<ApiOnboardedContext>> OnboardedContext([FromRoute] string externalContextId)
        {
            var onboardedContext = await Mediator.Send(new GetOnboardedContextQuery(externalContextId));

            if (onboardedContext == null)
            {
                return FusionApiError.NotFound(externalContextId, "Could not find onboarded context");
            }

            return new ApiOnboardedContext(onboardedContext);
        }

        [HttpPost("")]
        public async Task<ActionResult<string>> OnboardContext([FromBody] ApiOnboardContextRequest request)
        {
            var contextIdentifier = ContextIdentifier.FromExternalId(request.ExternalId);
            var context = await ContextResolver.ResolveContextAsync(contextIdentifier, FusionContextType.ProjectMaster);

            if (context == null || context.ExternalId == null)
            {
                return FusionApiError.NotFound(request.ExternalId, "Could not find any context with that external id");
            }

            return await Mediator.Send(request.ToCommand(context.ExternalId, context.Type));
        }

        [HttpPut("{externalContextId}")]
        public async Task<ActionResult<string>> UpdateOnboardedContext([FromRoute] string externalContextId, [FromBody] ApiUpdateOnboardedContextRequest request)
        {
            return await Mediator.Send(request.ToCommand(externalContextId));
        }

        [HttpDelete("{externalContextId}")]
        public async Task<ActionResult> RemoveOnboardedContext([FromRoute] string externalContextId)
        {
            var request = new ApiRemoveOnboardedContextRequest { ExternalId = externalContextId };
            await Mediator.Send(request.ToCommand());

            return NoContent();
        }
    }
}