using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedContexts.GetOnboardedContext;
using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedContexts.GetOnboardedContexts;
using Equinor.ProjectExecutionPortal.WebApi.Authorization;
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

            return Ok(onboardedContextsDto.Select(onboardedContextDto => new ApiOnboardedContext(onboardedContextDto)).ToList());
        }

        [HttpGet("{contextExternalId}")]
        public async Task<ActionResult<ApiOnboardedContext>> OnboardedContext([FromRoute] string contextExternalId)
        {
            var onboardedContext = await Mediator.Send(new GetOnboardedContextQuery(contextExternalId));

            if (onboardedContext == null)
            {
                return FusionApiError.NotFound(contextExternalId, "Could not find onboarded context");
            }

            return Ok(new ApiOnboardedContext(onboardedContext));
        }

        [HttpPost("")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult<string>> OnboardContext([FromBody] ApiOnboardContextRequest request)
        {
            var contextIdentifier = ContextIdentifier.FromExternalId(request.ExternalId);
            var context = await ContextResolver.ResolveContextAsync(contextIdentifier, FusionContextType.ProjectMaster);

            if (context == null || context.ExternalId == null)
            {
                return FusionApiError.NotFound(request.ExternalId, "Could not find any context with that external id");
            }

            await Mediator.Send(request.ToCommand(context.ExternalId, context.Type));

            return Ok();
        }

        [HttpPut("{contextExternalId}")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult<string>> UpdateOnboardedContext([FromRoute] string contextExternalId, [FromBody] ApiUpdateOnboardedContextRequest request)
        {
            await Mediator.Send(request.ToCommand(contextExternalId));

            return Ok();
        }

        [HttpDelete("{contextExternalId}")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult> RemoveOnboardedContext([FromRoute] string contextExternalId)
        {
            var request = new ApiRemoveOnboardedContextRequest { ExternalId = contextExternalId };
            await Mediator.Send(request.ToCommand());

            return Ok();
        }
    }
}
