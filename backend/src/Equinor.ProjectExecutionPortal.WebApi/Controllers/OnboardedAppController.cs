using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApps.GetOnboardedApp;
using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApps.GetOnboardedApps;
using Equinor.ProjectExecutionPortal.WebApi.Authorization;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiVersion("0.1")]
    [Route("api/onboarded-apps")]
    public class OnboardedAppController : ApiControllerBase
    {
        [HttpGet("")]
        public async Task<ActionResult<IList<ApiOnboardedApp>>> OnboardedApps()
        {
            var onboardedAppsDto = await Mediator.Send(new GetOnboardedAppsQuery());

            return Ok(onboardedAppsDto.Select(onboardedAppDto => new ApiOnboardedApp(onboardedAppDto)).ToList());
        }

        [HttpGet("{appKey}")]
        public async Task<ActionResult<ApiOnboardedApp>> OnboardedApp([FromRoute] string appKey)
        {
            var onboardedAppDto = await Mediator.Send(new GetOnboardedAppQuery(appKey));

            return new ApiOnboardedApp(onboardedAppDto);
        }

        [HttpPost("")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult<Guid>> OnboardApp([FromBody] ApiOnboardAppRequest request)
        {
            await Mediator.Send(request.ToCommand());

            return Ok();
        }

        [HttpPut("{appKey}")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult<Guid>> UpdateOnboardedApp([FromRoute] string appKey, [FromBody] ApiUpdateOnboardedAppRequest request)
        {
            await Mediator.Send(request.ToCommand(appKey));

            return Ok();
        }

        [HttpDelete("{appKey}")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult> RemoveOnboardedApp([FromRoute] string appKey)
        {
            var request = new ApiRemoveOnboardedAppRequest { AppKey = appKey };

            await Mediator.Send(request.ToCommand());

            return Ok();
        }

        [HttpPut("reorder")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult<Guid>> ReorderOnboardedApps([FromBody] ApiReorderOnboardedAppsRequest request)
        {
            await Mediator.Send(request.ToCommand());

            return Ok();
        }
    }
}
