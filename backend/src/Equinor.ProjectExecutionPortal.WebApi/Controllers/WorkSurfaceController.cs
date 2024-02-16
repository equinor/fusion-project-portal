using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaces.GetWorkSurface;
using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaces.GetWorkSurfaceAppGroupsWithContextAndGlobalApps;
using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaces.GetWorkSurfaceAppGroupsWithGlobalApps;
using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaces.GetWorkSurfaces;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.WebApi.Authorization;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurface;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceApp;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceContextType;
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

            return Ok(workSurfaceDtos.Select(dto => new ApiWorkSurface(dto)).ToList());
        }

        [HttpGet("{workSurfaceId:guid}")]
        public async Task<ActionResult<ApiWorkSurface>> WorkSurface([FromRoute] Guid workSurfaceId)
        {
            var workSurfaceWithAppsDto = await Mediator.Send(new GetWorkSurfaceQuery(workSurfaceId));

            if (workSurfaceWithAppsDto == null)
            {
                return FusionApiError.NotFound(workSurfaceId, "Could not find work surface");
            }

            return Ok(new ApiWorkSurface(workSurfaceWithAppsDto));
        }

        [HttpPost("")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult<Guid>> CreateWorkSurface([FromBody] ApiCreateWorkSurfaceRequest request)
        {
            try
            {
                await Mediator.Send(request.ToCommand());
            }
            catch (NotFoundException ex)
            {
                return FusionApiError.NotFound(request.Name, ex.Message);
            }
            catch (InvalidActionException ex)
            {
                return FusionApiError.InvalidOperation("400", ex.Message);
            }
            catch (Exception)
            {
                return FusionApiError.InvalidOperation("500", "An error occurred while creating work surface");
            }

            return Ok();
        }

        [HttpPut("{workSurfaceId:guid}")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult<Guid>> UpdateWorkSurface([FromRoute] Guid workSurfaceId, [FromBody] ApiUpdateWorkSurfaceRequest request)
        {
            try
            {
                await Mediator.Send(request.ToCommand(workSurfaceId));
            }
            catch (NotFoundException ex)
            {
                return FusionApiError.NotFound(workSurfaceId, ex.Message);
            }
            catch (Exception)
            {
                return FusionApiError.InvalidOperation("500", "An error occurred while updating work surface");
            }

            return Ok();
        }

        [HttpPut("{workSurfaceId:guid}/setAsDefault")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult<Guid>> SetWorkSurfaceAsDefault([FromRoute] Guid workSurfaceId)
        {
            var request = new ApiSetWorkSurfaceAsDefaultRequest();

            try
            {
                await Mediator.Send(request.ToCommand(workSurfaceId));
            }
            catch (NotFoundException ex)
            {
                return FusionApiError.NotFound(workSurfaceId, ex.Message);
            }
            catch (Exception)
            {
                return FusionApiError.InvalidOperation("500", "An error occurred while setting default work surface");
            }

            return Ok();
        }

        // Apps

        [HttpGet("{workSurfaceId:guid}/apps")]
        [HttpGet("{workSurfaceId:guid}/contexts/{contextExternalId}/type/{contextType}/apps")]
        public async Task<ActionResult<List<ApiWorkSurfaceAppGroupWithApps>>> WorkSurfaceApps([FromRoute] Guid workSurfaceId, [FromRoute] string? contextExternalId, [FromRoute] string? contextType)
        {
            if (contextExternalId != null)
            {
                var contextIdentifier = ContextIdentifier.FromExternalId(contextExternalId);
                var fusionContextType = FusionContextType.Resolve(contextType);
                var context = await ContextResolver.ResolveContextAsync(contextIdentifier, fusionContextType);

                if (context == null)
                {
                    return FusionApiError.NotFound(contextExternalId, "Could not find context by external id and type");
                }
            }

            var appGroupsDto = contextExternalId != null ?
                await Mediator.Send(new GetWorkSurfaceAppGroupsWithContextAndGlobalAppsQuery(workSurfaceId, contextExternalId, contextType)) :
                await Mediator.Send(new GetWorkSurfaceAppGroupsWithGlobalAppsQuery(workSurfaceId));

            if (appGroupsDto == null)
            {
                return FusionApiError.NotFound(workSurfaceId, "Could not find Work Surface with id");
            }

            return Ok(appGroupsDto.Select(x => new ApiWorkSurfaceAppGroupWithApps(x)).ToList());
        }

        [HttpGet("{workSurfaceId:guid}/context/{contextId:guid}/apps")]
        public async Task<ActionResult<List<ApiWorkSurfaceAppGroupWithApps>>> WorkSurfaceApps([FromRoute] Guid workSurfaceId, [FromRoute] Guid contextId)
        {

            var appGroupsDto = await Mediator.Send(new GetWorkSurfaceAppGroupsWithContextAndGlobalAppsByContextIdQuery(workSurfaceId,contextId));

            if (appGroupsDto == null)
            {
                return FusionApiError.NotFound(workSurfaceId, "Could not find Work Surface with id");
            }

            return Ok(appGroupsDto.Select(x => new ApiWorkSurfaceAppGroupWithApps(x)).ToList());
        }

        [HttpPost("{workSurfaceId:guid}/apps")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult<Guid>> AddWorkSurfaceApp([FromRoute] Guid workSurfaceId, [FromBody] ApiAddGlobalAppToWorkSurfaceRequest request)
        {
            try
            {
                await Mediator.Send(request.ToCommand(workSurfaceId));
            }
            catch (NotFoundException ex)
            {
                return FusionApiError.NotFound(workSurfaceId, ex.Message);
            }
            catch (InvalidActionException ex)
            {
                return FusionApiError.InvalidOperation("500", ex.Message);
            }
            catch (Exception)
            {
                return FusionApiError.InvalidOperation("500", "An error occurred while adding work surface app");
            }

            return Ok();
        }

        [HttpPost("{workSurfaceId:guid}/contexts/{contextExternalId}/apps")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult<Guid>> AddWorkSurfaceApp([FromRoute] Guid workSurfaceId, string contextExternalId, [FromBody] ApiAddContextAppToWorkSurfaceRequest request)
        {
            var contextIdentifier = ContextIdentifier.FromExternalId(contextExternalId);
            var context = await ContextResolver.ResolveContextAsync(contextIdentifier, FusionContextType.ProjectMaster);

            if (context == null || context.ExternalId == null)
            {
                return FusionApiError.NotFound(contextExternalId, "Could not find context by external id");
            }

            try
            {
                await Mediator.Send(request.ToCommand(workSurfaceId, context.ExternalId));
            }
            catch (NotFoundException ex)
            {
                return FusionApiError.NotFound(workSurfaceId, ex.Message);
            }
            catch (InvalidActionException ex)
            {
                return FusionApiError.InvalidOperation("500", ex.Message);
            }
            catch (Exception)
            {
                return FusionApiError.InvalidOperation("500", "An error occurred while adding work surface app");
            }

            return Ok();
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

                try
                {
                    await Mediator.Send(request.ToCommand(workSurfaceId, context.ExternalId, appKey));
                }
                catch (NotFoundException ex)
                {
                    return FusionApiError.NotFound(workSurfaceId, ex.Message);
                }
                catch (Exception)
                {
                    return FusionApiError.InvalidOperation("500", "An error occurred while removing work surface app");
                }
            }
            else
            {
                try
                {
                    await Mediator.Send(request.ToCommand(workSurfaceId, appKey));
                }
                catch (NotFoundException ex)
                {
                    return FusionApiError.NotFound(workSurfaceId, ex.Message);
                }
                catch (Exception)
                {
                    return FusionApiError.InvalidOperation("500", "An error occurred while removing work surface app");
                }
            }

            return Ok();
        }

        //ContextTypes
        [HttpPost("{workSurfaceId:guid}/context-type")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult<Guid>> AddContextType([FromRoute] Guid workSurfaceId, [FromBody] ApiAddContextTypeToWorkSurfaceRequest request)
        {
            try
            {
                await Mediator.Send(request.ToCommand(workSurfaceId));
            }
            catch (NotFoundException ex)
            {
                return FusionApiError.NotFound(workSurfaceId, ex.Message);
            }
            catch (InvalidActionException ex)
            {
                return FusionApiError.InvalidOperation("500", ex.Message);
            }
            catch (Exception)
            {
                return FusionApiError.InvalidOperation("500", "An error occurred while adding work surface app");
            }

            return Ok();
        }
        //[HttpDelete("{workSurfaceId:guid}/apps/{appKey}")]
        [HttpDelete("{workSurfaceId:guid}/context-type/{contextType}")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult> RemoveContextType([FromRoute] Guid workSurfaceId, [FromRoute] string contextType)
        {
            var request = new ApiRemoveWorkSurfaceContextType();
            try
            {
                await Mediator.Send(request.ToCommand(workSurfaceId, contextType));
            }
            catch (NotFoundException ex)
            {
                return FusionApiError.NotFound(workSurfaceId, ex.Message);
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
