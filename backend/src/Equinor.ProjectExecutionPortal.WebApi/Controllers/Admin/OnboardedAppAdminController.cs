using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApp.GetOnboardedApps;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers.Admin
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiVersion("0.1")]
    [Route("api/admin/onboarded-apps")]
    public class OnboardedAppAdminController : ApiControllerBase
    {
        [HttpGet("")]
        public async Task<ActionResult<IList<ApiOnboardedApp>>> OnboardedApps()
        {
            var onboardedAppsDto = await Mediator.Send(new GetOnboardedAppsQuery());

            return onboardedAppsDto.Select(onboardedAppDto => new ApiOnboardedApp(onboardedAppDto)).ToList();
        }

        [HttpPost("")]
        public async Task<ActionResult<Guid>> OnboardApp([FromBody] ApiOnboardAppRequest request)
        {
            return await Mediator.Send(request.ToCommand());
        }

        [HttpDelete("{appKey}")]
        public async Task<ActionResult> RemoveOnboardedApp([FromRoute] string appKey)
        {
            var request = new ApiRemoveOnboardedAppRequest { AppKey = appKey };
            await Mediator.Send(request.ToCommand());

            return NoContent();
        }
    }
}
