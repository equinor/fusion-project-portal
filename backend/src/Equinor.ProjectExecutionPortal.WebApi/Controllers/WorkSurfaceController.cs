﻿using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaces.GetWorkSurface;
using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaces.GetWorkSurfaceAppGroupsWithContextAndGlobalApps;
using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaces.GetWorkSurfaceAppGroupsWithGlobalApps;
using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaces.GetWorkSurfaces;
using Equinor.ProjectExecutionPortal.WebApi.Authorization;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurface;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceApp;
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
        public async Task<ActionResult<ApiWorkSurface>> WorkSurface([FromRoute] Guid workSurfaceId)
        {
            var workSurfaceWithAppsDto = await Mediator.Send(new GetWorkSurfaceQuery(workSurfaceId));

            if (workSurfaceWithAppsDto == null)
            {
                return FusionApiError.NotFound(workSurfaceId, "Could not find work surface");
            }

            return new ApiWorkSurface(workSurfaceWithAppsDto);
        }

        [HttpPost("")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult<Guid>> CreateWorkSurface([FromBody] ApiCreateWorkSurfaceRequest request)
        {
            return await Mediator.Send(request.ToCommand());
        }

        [HttpPut("{workSurfaceId:guid}")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult<Guid>> UpdateWorkSurface([FromRoute] Guid workSurfaceId, [FromBody] ApiUpdateWorkSurfaceRequest request)
        {
            return await Mediator.Send(request.ToCommand(workSurfaceId));
        }

        [HttpPut("{workSurfaceId:guid}/setAsDefault")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult<Guid>> SetWorkSurfaceAsDefault([FromRoute] Guid workSurfaceId)
        {
            var request = new ApiSetWorkSurfaceAsDefaultRequest();
            return await Mediator.Send(request.ToCommand(workSurfaceId));
        }

        // Apps

        [HttpGet("{workSurfaceId:guid}/apps")]
        [HttpGet("{workSurfaceId:guid}/contexts/{contextExternalId}/apps")]
        public async Task<ActionResult<List<ApiWorkSurfaceAppGroupWithApps>>> WorkSurfaceApps([FromRoute] Guid workSurfaceId, [FromRoute] string? contextExternalId)
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

            var appGroupsDto = contextExternalId != null ?
                await Mediator.Send(new GetWorkSurfaceAppGroupsWithContextAndGlobalAppsQuery(workSurfaceId, contextExternalId)) :
                await Mediator.Send(new GetWorkSurfaceAppGroupsWithGlobalAppsQuery(workSurfaceId));

            return appGroupsDto.Select(x => new ApiWorkSurfaceAppGroupWithApps(x)).ToList();
        }

        [HttpPost("{workSurfaceId:guid}/apps")]
        [HttpPost("{workSurfaceId:guid}/contexts/{contextExternalId}/apps")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult<Guid>> AddWorkSurfaceApp([FromRoute] Guid workSurfaceId, string? contextExternalId, [FromBody] ApiAddWorkSurfaceAppRequest request)
        {
            if (contextExternalId == null)
            {
                await Mediator.Send(request.ToCommand(workSurfaceId));
            }
            else
            {
                var contextIdentifier = ContextIdentifier.FromExternalId(contextExternalId);
                var context = await ContextResolver.ResolveContextAsync(contextIdentifier, FusionContextType.ProjectMaster);

                if (context == null || context.ExternalId == null)
                {
                    return FusionApiError.NotFound(contextExternalId, "Could not find context by external id");
                }

                await Mediator.Send(request.ToCommand(workSurfaceId, context.ExternalId));
            }

            return NoContent();
        }

        [HttpDelete("{workSurfaceId:guid}/apps/{appKey}")]
        [HttpDelete("{workSurfaceId:guid}/contexts/{contextExternalId}/apps/{appKey}")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult> RemoveWorkSurfaceApp([FromRoute] Guid workSurfaceId, string? contextExternalId, [FromRoute] string appKey)
        {
            // TODO: Removing global should come with a warning. E.g highlight affected contexts
            var request = new ApiRemoveWorkSurfaceAppRequest();

            if (contextExternalId != null)
            {
                var contextIdentifier = ContextIdentifier.FromExternalId(contextExternalId);
                var context = await ContextResolver.ResolveContextAsync(contextIdentifier, FusionContextType.ProjectMaster);

                if (context == null || context.ExternalId == null)
                {
                    return FusionApiError.NotFound(contextExternalId, "Could not find context by external id");
                }

                await Mediator.Send(request.ToCommand(workSurfaceId, context.ExternalId, appKey));
            }
            else
            {
                await Mediator.Send(request.ToCommand(workSurfaceId, appKey));
            }

            return NoContent();
        }
    }
}
