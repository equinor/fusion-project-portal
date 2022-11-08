using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurface;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers.Admin
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiVersion("0.1")]
    [Route("api/admin/work-surfaces")]
    public class WorkSurfaceAdminController : ApiControllerBase
    {
        [HttpPost("")]
        public IActionResult CreateWorkSurface([FromBody] string name)
        {
            return Json($"{name} work surface created, NOT");
        }

        [HttpPut("{workSurfaceId:guid}")]
        public async Task<ActionResult<Guid>> UpdateWorkSurface([FromRoute] Guid workSurfaceId, [FromBody] ApiUpdateWorkSurfaceRequest request)
        {
            return await Mediator.Send(request.ToCommand(workSurfaceId));
        }

        [HttpPut("{workSurfaceId:guid}/setAsDefault")]
        public async Task<ActionResult<Guid>> SetWorkSurfaceAsDefault([FromRoute] Guid workSurfaceId)
        {
            var request = new ApiSetWorkSurfaceAsDefaultRequest();
            return await Mediator.Send(request.ToCommand(workSurfaceId));
        }

        [HttpPost("{workSurfaceId:guid}/apps")]
        public IActionResult AddAppToWorkSurface([FromRoute] Guid workSurfaceId, [FromBody] string appKey)
        {
            return Json($"{appKey} added to work surface {workSurfaceId}, NOT");
        }

        [HttpDelete("{workSurfaceId:guid}/apps/{appKey}")]
        public IActionResult RemoveAppFromWorkSurface([FromRoute] Guid workSurfaceId, [FromRoute] string appKey)
        {
            return Json($"{appKey} Removed from {workSurfaceId}, NOT");
        }
    }
}
