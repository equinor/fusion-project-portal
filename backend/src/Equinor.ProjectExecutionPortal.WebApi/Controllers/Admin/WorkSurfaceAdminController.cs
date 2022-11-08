using Equinor.ProjectExecutionPortal.WebApi.ViewModels.Admin;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp;
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
        [HttpPost("{workSurfaceId:guid}/{externalContextId}/apps")]
        public async Task<ActionResult<Guid>> AddWorkSurfaceApp([FromRoute] Guid workSurfaceId, string? externalContextId, [FromBody] ApiAddWorkSurfaceAppRequest request)
        {
            return await Mediator.Send(request.ToCommand(workSurfaceId, externalContextId));
        }

        [HttpDelete("{workSurfaceId:guid}/apps/{appKey}")]
        [HttpDelete("{workSurfaceId:guid}/{externalContextId}/apps/{appKey}")]
        public async Task<ActionResult> RemoveWorkSurfaceApp([FromRoute] Guid workSurfaceId, string? externalContextId, [FromRoute] string appKey)
        {
            var request = new ApiRemoveWorkSurfaceAppRequest();
            await Mediator.Send(request.ToCommand(workSurfaceId, externalContextId, appKey));

            return NoContent();
        }
    }
}
