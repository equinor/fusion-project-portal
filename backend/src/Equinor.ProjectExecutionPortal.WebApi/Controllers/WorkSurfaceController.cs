using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface.GetWorkSurface;
using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface.GetWorkSurfaceApps;
using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface.GetWorkSurfaces;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurface;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceApp;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceAppGroup;
using Fusion.Integration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiVersion("0.1")]
    [Route("api/work-surfaces")]
    public class WorkSurfaceController : ApiControllerBase
    {
        [HttpGet("")]
        public async Task<ActionResult<IList<ApiWorkSurface>>> WorkSurfaces()
        {
            var workSurfaceDtos = await Mediator.Send(new GetWorkSurfacesQuery());

            return workSurfaceDtos.Select(dto => new ApiWorkSurface(dto)).ToList();
        }

        [HttpGet("{workSurfaceId:guid}")]
        [HttpGet("{workSurfaceId:guid}/contexts/{contextExternalId}")]
        public async Task<ActionResult<ApiWorkSurface>> WorkSurface([FromRoute] Guid workSurfaceId, [FromRoute] string? contextExternalId)
        {
            if (contextExternalId != null)
            {
                var contextIdentifier = ContextIdentifier.FromExternalId(contextExternalId);
                var context = await ContextResolver.ResolveContextAsync(contextIdentifier, FusionContextType.ProjectMaster);

                if (context == null)
                {
                    return FusionApiError.NotFound(contextExternalId, "Could not find context by external id");
                }
            }

            var workSurfaceWithAppsDto = await Mediator.Send(new GetWorkSurfaceWithAppsQuery(workSurfaceId, contextExternalId));

            if (workSurfaceWithAppsDto == null)
            {
                return FusionApiError.NotFound(workSurfaceId, "Could not find work surface");
            }

            return new ApiWorkSurface(workSurfaceWithAppsDto);
        }

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

        [HttpGet("{workSurfaceId:guid}/apps")]
        [HttpGet("{workSurfaceId:guid}/contexts/{contextExternalId}/apps")]
        public async Task<ActionResult<List<ApiWorkSurfaceAppGroup>>> WorkSurfaceApps([FromRoute] Guid workSurfaceId, [FromRoute] string? contextExternalId)
        {
            if (contextExternalId != null)
            {
                var contextIdentifier = ContextIdentifier.FromExternalId(contextExternalId);
                var context = await ContextResolver.ResolveContextAsync(contextIdentifier, FusionContextType.ProjectMaster);

                if (context == null)
                {
                    return FusionApiError.NotFound(contextExternalId, "Could not find context by external id");
                }
            }

            var appGroupsDto = await Mediator.Send(new GetWorkSurfaceAppGroupsWithAppsQuery(workSurfaceId, contextExternalId));

            return appGroupsDto.Select(x => new ApiWorkSurfaceAppGroup(x)).ToList();
        }

        [HttpPost("{workSurfaceId:guid}/apps")]
        [HttpPost("{workSurfaceId:guid}/contexts/{contextExternalId}/apps")]
        public async Task<ActionResult<Guid>> AddWorkSurfaceApp([FromRoute] Guid workSurfaceId, string? contextExternalId, [FromBody] ApiAddWorkSurfaceAppRequest request)
        {
            if (contextExternalId == null)
            {
                await Mediator.Send(request.ToCommand(workSurfaceId, null, null));
            }
            else
            {
                var contextIdentifier = ContextIdentifier.FromExternalId(contextExternalId);
                var context = await ContextResolver.ResolveContextAsync(contextIdentifier, FusionContextType.ProjectMaster);

                if (context == null)
                {
                    return FusionApiError.NotFound(contextExternalId, "Could not find context by external id");
                }

                await Mediator.Send(request.ToCommand(workSurfaceId, context.ExternalId, context.Type));
            }

            return NoContent();
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



        // App Groups
        // ===========================================




        [HttpPost("{workSurfaceId:guid}/app-groups")]
        public async Task<ActionResult<Guid>> CreateAppGroup([FromRoute] Guid workSurfaceId, [FromBody] ApiCreateWorkSurfaceAppGroupRequest request)
        {
            return await Mediator.Send(request.ToCommand(workSurfaceId));
        }

        [HttpPut("{workSurfaceId:guid}/app-groups/{appGroupId:guid}")]
        public async Task<ActionResult<Guid>> UpdateAppGroup([FromRoute] Guid workSurfaceId, [FromRoute] Guid appGroupId, [FromBody] ApiUpdateWorkSurfaceAppGroupRequest request)
        {
            return await Mediator.Send(request.ToCommand(workSurfaceId, appGroupId));
        }

        [HttpDelete("{workSurfaceId:guid}/app-groups/{appGroupId:guid}")]
        public async Task<ActionResult<Guid>> DeleteAppGroup([FromRoute] Guid workSurfaceId, [FromRoute] Guid appGroupId, [FromBody] ApiDeleteWorkSurfaceAppGroupRequest request)
        {
            return await Mediator.Send(request.ToCommand(workSurfaceId, appGroupId));
        }

        [HttpPut("{workSurfaceId:guid}/app-groups/reorder")]
        public async Task<ActionResult<Guid>> ReorderAppGroups([FromRoute] Guid workSurfaceId, [FromBody] ApiReorderAppGroupsRequest request)
        {
            return await Mediator.Send(request.ToCommand(workSurfaceId));
        }
    }
}
