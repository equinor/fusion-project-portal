using Equinor.ProjectExecutionPortal.Application.Queries.AppGroup.GetAppGroups;
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

            return appGroupsDto.Select(x => new ApiAppGroup(x)).ToList();
        }

        [HttpPost("")]
        public async Task<ActionResult<Guid>> CreateAppGroup([FromBody] ApiCreateAppGroupRequest request)
        {
            return await Mediator.Send(request.ToCommand());
        }

        [HttpPut("{appGroupId:guid}")]
        public async Task<ActionResult<Guid>> UpdateAppGroup([FromRoute] Guid appGroupId, [FromBody] ApiUpdateAppGroupRequest request)
        {
            return await Mediator.Send(request.ToCommand(appGroupId));
        }

        [HttpDelete("{appGroupId:guid}")]
        public async Task<ActionResult<Guid>> DeleteAppGroup([FromRoute] Guid appGroupId)
        {
            var request = new ApiDeleteAppGroupRequest();
            await Mediator.Send(request.ToCommand(appGroupId));

            return NoContent();
        }

        [HttpPut("reorder")]
        public async Task<ActionResult<Guid>> ReorderAppGroups([FromBody] ApiReorderAppGroupsRequest request)
        {
            await Mediator.Send(request.ToCommand());

            return NoContent();
        }
    }
}
