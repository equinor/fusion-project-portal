using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApps.GetOnboardedApp;
using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApps.GetOnboardedApps;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.WebApi.Authorization;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedAppContextType;
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

            if (onboardedAppDto == null)
            {
                return FusionApiError.NotFound(appKey, "Could not find onboarded app");
            }

            return new ApiOnboardedApp(onboardedAppDto);
        }

        [HttpPost("")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult<Guid>> OnboardApp([FromBody] ApiOnboardAppRequest request)
        {
            try
            {
                await Mediator.Send(request.ToCommand());
            }
            catch (NotFoundException ex)
            {
                return FusionApiError.NotFound(null, ex.Message);
            }
            catch (InvalidActionException ex)
            {
                return FusionApiError.InvalidOperation("500", ex.Message);
            }
            catch (Exception)
            {
                return FusionApiError.InvalidOperation("500", "An error occurred while onboarding app");
            }

            return Ok();
        }

        [HttpPut("{appKey}")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult<Guid>> UpdateOnboardedApp([FromRoute] string appKey, [FromBody] ApiUpdateOnboardedAppRequest request)
        {
            try
            {
                await Mediator.Send(request.ToCommand(appKey));
            }
            catch (NotFoundException ex)
            {
                return FusionApiError.NotFound(appKey, ex.Message);
            }
            catch (Exception)
            {
                return FusionApiError.InvalidOperation("500", "An error occurred while updating the onboarded app");
            }

            return Ok();
        }

        [HttpDelete("{appKey}")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult> RemoveOnboardedApp([FromRoute] string appKey)
        {
            var request = new ApiRemoveOnboardedAppRequest { AppKey = appKey };

            try
            {
                await Mediator.Send(request.ToCommand());
            }
            catch (NotFoundException ex)
            {
                return FusionApiError.NotFound(appKey, ex.Message);
            }
            catch (Exception)
            {
                return FusionApiError.InvalidOperation("500", "An error occurred while removing the onboarded app");
            }

            return Ok();
        }

        //ContextTypes
        [HttpPost("{appKey}/context-type")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult<Guid>> AddContextType([FromRoute] string appKey, [FromBody] ApiAddContextTypeToOnboardedAppRequest request)
        {
            try
            {
                await Mediator.Send(request.ToCommand(appKey));
            }
            catch (NotFoundException ex)
            {
                return FusionApiError.NotFound(appKey, ex.Message);
            }
            catch (InvalidActionException ex)
            {
                return FusionApiError.InvalidOperation("500", ex.Message);
            }
            catch (Exception)
            {
                return FusionApiError.InvalidOperation("500", "An error occurred while adding context-type");
            }

            return Ok();
        }
        
        [HttpDelete("{appKey}/context-type/{contextType}")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult> RemoveContextType([FromRoute] string appKey, [FromRoute] string contextType)
        {
            var request = new ApiRemoveOnboardedAppContextType();
            try
            {
                await Mediator.Send(request.ToCommand(appKey, contextType));
            }
            catch (NotFoundException ex)
            {
                return FusionApiError.NotFound(appKey, ex.Message);
            }
            catch (InvalidActionException ex)
            {
                return FusionApiError.InvalidOperation("500", ex.Message);
            }
            catch (Exception)
            {
                return FusionApiError.InvalidOperation("500", "An error occurred while removing context-type");
            }

            return Ok();
        }
    }
}
