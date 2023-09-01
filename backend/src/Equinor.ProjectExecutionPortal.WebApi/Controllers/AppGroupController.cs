using Equinor.ProjectExecutionPortal.Application.Queries.AppGroups.GetAppGroups;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.WebApi.Authorization;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.AppGroup;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiVersion("0.1")]
    [Route("api/app-groups")]
    public class AppGroupController : ApiControllerBase
    {
        [HttpGet("")]
        public async Task<ActionResult<List<ApiAppGroup>>> GetAppGroups()
        {
            var appGroupsDto = await Mediator.Send(new GetAppGroups());

            return Ok(appGroupsDto.Select(x => new ApiAppGroup(x)).ToList());
        }

        [HttpPost("")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult<Guid>> CreateAppGroup([FromBody] ApiCreateAppGroupRequest request)
        {
            try
            {
                await Mediator.Send(request.ToCommand());
            }
            catch (Exception)
            {
                return FusionApiError.InvalidOperation("500", "An error occurred while creating app group");
            }

            return Ok();
        }

        [HttpPut("{appGroupId:guid}")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult<Guid>> UpdateAppGroup([FromRoute] Guid appGroupId, [FromBody] ApiUpdateAppGroupRequest request)
        {
            try
            {
                await Mediator.Send(request.ToCommand(appGroupId));
            }
            catch (NotFoundException ex)
            {
                return FusionApiError.NotFound(appGroupId, ex.Message);
            }
            catch (Exception)
            {
                return FusionApiError.InvalidOperation("500", "An error occurred while updating app group");
            }

            return Ok();
        }

        [HttpDelete("{appGroupId:guid}")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult<Guid>> DeleteAppGroup([FromRoute] Guid appGroupId)
        {
            var request = new ApiDeleteAppGroupRequest();

            try
            {
                await Mediator.Send(request.ToCommand(appGroupId));
            }
            catch (NotFoundException ex)
            {
                return FusionApiError.NotFound(appGroupId, ex.Message);
            }
            catch (InvalidActionException ex)
            {
                return FusionApiError.InvalidOperation("500", ex.Message);
            }
            catch (Exception)
            {
                return FusionApiError.InvalidOperation("500", "An error occurred while deleting app group");
            }

            return Ok();
        }

        [HttpPut("reorder")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult<Guid>> ReorderAppGroups([FromBody] ApiReorderAppGroupsRequest request)
        {
            try
            {
                await Mediator.Send(request.ToCommand());
            }
            catch (InvalidActionException ex)
            {
                return FusionApiError.InvalidOperation("500", ex.Message);
            }
            catch (Exception)
            {
                return FusionApiError.InvalidOperation("500", "An error occurred while reordering app groups");
            }

            return Ok();
        }
    }
}
