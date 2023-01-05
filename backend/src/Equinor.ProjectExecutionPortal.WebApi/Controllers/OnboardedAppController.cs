using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApp.GetOnboardedApps;
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
            // TODO: Removing should come with a warning. E.g highlight affected work surfaces and contexts

            var request = new ApiRemoveOnboardedAppRequest { AppKey = appKey };
            await Mediator.Send(request.ToCommand());

            return NoContent();
        }

        //[HttpPut("reorder")]
        //public async Task<ActionResult<Guid>> ReorderOnboardedApps([FromBody] ApiReorderOnboardedAppsRequest request)
        //{
        //    await Mediator.Send(request.ToCommand());

        //    return NoContent();
        //}
    }
}
