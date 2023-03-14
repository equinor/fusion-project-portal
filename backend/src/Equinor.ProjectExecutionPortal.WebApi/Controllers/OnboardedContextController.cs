using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedContext.GetOnboardedContext;
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
        // TODO: Onboard contexts, update context w. description field, remove onboarded context.
        // Then validate onboarded context same as onboarded app is.

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
            return await Mediator.Send(request.ToCommand());
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
    }
}
