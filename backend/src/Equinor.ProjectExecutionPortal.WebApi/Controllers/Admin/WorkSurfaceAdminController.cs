using Equinor.ProjectExecutionPortal.WebApi.ViewModels.Admin;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurface;
using Fusion.Integration;
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
        public async Task<ActionResult<Guid>> CreateWorkSurface([FromBody] ApiCreateWorkSurfaceRequest request)
        {
            return await Mediator.Send(request.ToCommand());
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
        [HttpPost("{workSurfaceId:guid}/contexts/{contextExternalId}/apps")]
        public async Task<ActionResult<Guid>> AddWorkSurfaceApp([FromRoute] Guid workSurfaceId, string? contextExternalId, [FromBody] ApiAddWorkSurfaceAppRequest request)
        {
            if (contextExternalId == null)
            {
                return await Mediator.Send(request.ToCommand(workSurfaceId, null, null));
            }

            var contextIdentifier = ContextIdentifier.FromExternalId(contextExternalId);
            var context = await ContextResolver.ResolveContextAsync(contextIdentifier, FusionContextType.ProjectMaster);

            if (context == null)
            {
                return FusionApiError.NotFound(contextExternalId, "Could not find context by external id");
            }

            return await Mediator.Send(request.ToCommand(workSurfaceId, context.ExternalId, context.Type));
        }

        [HttpDelete("{workSurfaceId:guid}/apps/{appKey}")]
        [HttpDelete("{workSurfaceId:guid}/contexts/{contextExternalId}/apps/{appKey}")]
        public async Task<ActionResult> RemoveWorkSurfaceApp([FromRoute] Guid workSurfaceId, string? contextExternalId, [FromRoute] string appKey)
        {
            // TODO: Removing global should come with a warning. E.g highlight affected contexts

            if (contextExternalId != null)
            {
                var contextIdentifier = ContextIdentifier.FromExternalId(contextExternalId);
                var context = await ContextResolver.ResolveContextAsync(contextIdentifier, FusionContextType.ProjectMaster);

                if (context == null)
                {
                    return FusionApiError.NotFound(contextExternalId, "Could not find context by external id");
                }
            }

            var request = new ApiRemoveWorkSurfaceAppRequest();
            await Mediator.Send(request.ToCommand(workSurfaceId, contextExternalId, appKey));

            return NoContent();
        }
    }
}
