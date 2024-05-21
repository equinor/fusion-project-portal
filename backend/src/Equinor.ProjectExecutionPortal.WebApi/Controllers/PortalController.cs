using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaces.GetWorkSurface;
using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaces.GetWorkSurfaceAppGroupsWithContextAndGlobalApps;
using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaces.GetWorkSurfaceAppGroupsWithGlobalApps;
using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaces.GetWorkSurfaceApps;
using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaces.GetWorkSurfaces;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.WebApi.Authorization;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.PortalApp;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.PortalContextType;
using Fusion.Integration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiVersion("0.1")]
    [Route("api/portals")]
    public class PortalController : ApiControllerBase
    {
        [HttpGet("")]
        public async Task<ActionResult<IList<ApiPortal>>> WorkSurfaces()
        {
            var workSurfaceDtos = await Mediator.Send(new GetWorkSurfacesQuery());

            return Ok(workSurfaceDtos.Select(dto => new ApiPortal(dto)).ToList());
        }

        [HttpGet("{portalId:guid}")]
        public async Task<ActionResult<ApiPortal>> WorkSurface([FromRoute] Guid portalId)
        {
            var workSurfaceWithAppsDto = await Mediator.Send(new GetWorkSurfaceQuery(portalId));

            if (workSurfaceWithAppsDto == null)
            {
                return FusionApiError.NotFound(portalId, "Could not find portal");
            }

            return Ok(new ApiPortal(workSurfaceWithAppsDto));
        }

        [HttpPost("")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult<Guid>> CreateWorkSurface([FromBody] ApiCreatePortalRequest request)
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
                return FusionApiError.InvalidOperation("500", "An error occurred while creating portal");
            }

            return Ok();
        }

        [HttpPut("{portalId:guid}")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult<Guid>> UpdateWorkSurface([FromRoute] Guid portalId, [FromBody] ApiUpdatePortalRequest request)
        {
            try
            {
                await Mediator.Send(request.ToCommand(portalId));
            }
            catch (NotFoundException ex)
            {
                return FusionApiError.NotFound(portalId, ex.Message);
            }
            catch (Exception)
            {
                return FusionApiError.InvalidOperation("500", "An error occurred while updating portal");
            }

            return Ok();
        }

        [HttpPut("{portalId:guid}/setAsDefault")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult<Guid>> SetWorkSurfaceAsDefault([FromRoute] Guid portalId)
        {
            var request = new ApiSetPortalAsDefaultRequest();

            try
            {
                await Mediator.Send(request.ToCommand(portalId));
            }
            catch (NotFoundException ex)
            {
                return FusionApiError.NotFound(portalId, ex.Message);
            }
            catch (Exception)
            {
                return FusionApiError.InvalidOperation("500", "An error occurred while setting default portal");
            }

            return Ok();
        }

        // Apps

        [HttpGet("{portalId:guid}/app-groups")]
        public async Task<ActionResult<List<ApiPortalAppGroupWithApps>>> WorkSurfaceAppGroups([FromRoute] Guid portalId)
        {

            var appGroupsDto = await Mediator.Send(new GetWorkSurfaceAppGroupsWithGlobalAppsQuery(portalId));
            
            if (appGroupsDto == null)
            {
                return FusionApiError.NotFound(portalId, "Could not find portal with id");
            }

            return Ok(appGroupsDto.Select(x => new ApiPortalAppGroupWithApps(x)).ToList());
        }

        [HttpGet("{portalId:guid}/contexts/{contextExternalId}/type/{contextType}/app-groups")]
        public async Task<ActionResult<List<ApiPortalAppGroupWithApps>>> WorkSurfaceAppGroups([FromRoute] Guid portalId, [FromRoute] string contextExternalId, [FromRoute] string contextType)
        {
            var contextIdentifier = ContextIdentifier.FromExternalId(contextExternalId);
            var fusionContextType = FusionContextType.Resolve(contextType);
            var context = await ContextResolver.ResolveContextAsync(contextIdentifier, fusionContextType);

            if (context == null)
            {
                return FusionApiError.NotFound(contextExternalId, "Could not find context by external id and type");
            }

            var appGroupsDto =  await Mediator.Send(new GetWorkSurfaceAppGroupsWithContextAndGlobalAppsQuery(portalId, contextExternalId, contextType));

            if (appGroupsDto == null)
            {
                return FusionApiError.NotFound(portalId, "Could not find portal with id");
            }

            return Ok(appGroupsDto.Select(x => new ApiPortalAppGroupWithApps(x)).ToList());
        }

        [HttpGet("{portalId:guid}/contexts/{contextId:guid}/app-groups")]
        public async Task<ActionResult<List<ApiPortalAppGroupWithApps>>> WorkSurfaceAppGroups([FromRoute] Guid portalId, [FromRoute] Guid contextId)
        {

            var appGroupsDto = await Mediator.Send(new GetWorkSurfaceAppGroupsWithContextAndGlobalAppsByContextIdQuery(portalId,contextId));

            if (appGroupsDto == null)
            {
                return FusionApiError.NotFound(portalId, "Could not find portal with id");
            }

            return Ok(appGroupsDto.Select(x => new ApiPortalAppGroupWithApps(x)).ToList());
        }

        [HttpGet("{portalId:guid}/apps")]
        public async Task<ActionResult<List<ApiPortalApp>>> WorkSurfaceApps([FromRoute] Guid portalId)
        {
            //TODO: improve error handling
            var workSurfaceAppsDto = await Mediator.Send(new GetWorkSurfaceAppsQuery(portalId));

            if (workSurfaceAppsDto == null)
            {
                return FusionApiError.NotFound(portalId, "Could not find portal with id");

            }

            var workSurfaceApps = workSurfaceAppsDto.Apps.DistinctBy(x => x.OnboardedApp.Id);

            return Ok(workSurfaceApps.Select(x => new ApiPortalApp(x)).ToList());

        }

        [HttpGet("{portalId:guid}/contexts/{contextId:guid}/apps")]
        public async Task<ActionResult<List<ApiPortalApp>>> WorkSurfaceApps([FromRoute] Guid portalId, [FromRoute] Guid contextId)
        {
            //TODO: improve error handling
            var workSurfaceAppsDto = await Mediator.Send(new GetWorkSurfaceAppsWithContextAndGlobalAppsByContextIdQuery(portalId, contextId));

            if (workSurfaceAppsDto == null)
            {
                return FusionApiError.NotFound(portalId, "Could not find portal with id");
            }
            
            return Ok(workSurfaceAppsDto.Select(x => new ApiPortalApp(x)).ToList());
        }

        [HttpPost("{portalId:guid}/apps")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult<Guid>> AddWorkSurfaceApp([FromRoute] Guid portalId, [FromBody] ApiAddGlobalAppToPortalRequest request)
        {
            try
            {
                await Mediator.Send(request.ToCommand(portalId));
            }
            catch (NotFoundException ex)
            {
                return FusionApiError.NotFound(portalId, ex.Message);
            }
            catch (InvalidActionException ex)
            {
                return FusionApiError.InvalidOperation("500", ex.Message);
            }
            catch (Exception)
            {
                return FusionApiError.InvalidOperation("500", "An error occurred while adding portal app");
            }

            return Ok();
        }

        [HttpPost("{portalId:guid}/contexts/{contextId}/apps")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult<Guid>> AddWorkSurfaceApp([FromRoute] Guid portalId, Guid contextId, [FromBody] ApiAddContextAppToPortalRequest request)
        {

           try
           {
               await Mediator.Send(request.ToCommand(portalId, contextId));
           }
           catch (NotFoundException ex)
           {
               return FusionApiError.NotFound(portalId, ex.Message);
           }
           catch (InvalidActionException ex)
           {
               return FusionApiError.InvalidOperation("500", ex.Message);
           }
           catch (Exception)
           {
               return FusionApiError.InvalidOperation("500", "An error occurred while adding portal app");
           }

           return Ok();
        }

        [HttpDelete("{portalId:guid}/apps/{appKey}")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult> RemoveWorkSurfaceApp([FromRoute] Guid portalId, [FromRoute] string appKey)
        {
            // TODO: Removing global should come with a warning. E.g highlight affected contexts
            var request = new ApiRemovePortalAppRequest();

            try
            {
                await Mediator.Send(request.ToCommand(portalId, appKey));
            }
            catch (NotFoundException ex)
            {
                return FusionApiError.NotFound(portalId, ex.Message);
            }
            catch (Exception)
            {
                return FusionApiError.InvalidOperation("500", "An error occurred while removing portal app");
            }

            return Ok();
        }

        [HttpDelete("{portalId:guid}/contexts/{contextId:guid}/apps/{appKey}")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult> RemoveWorkSurfaceApp([FromRoute] Guid portalId, Guid contextId, [FromRoute] string appKey)
        {
            // TODO: Removing global should come with a warning. E.g highlight affected contexts
            var request = new ApiRemovePortalAppRequest();

            try
            {
                await Mediator.Send(request.ToCommand(portalId, contextId, appKey));
            }
            catch (NotFoundException ex)
            {
                return FusionApiError.NotFound(portalId, ex.Message);
            }
            catch (Exception)
            {
                return FusionApiError.InvalidOperation("500", "An error occurred while removing portal app");
            }

            return Ok();
        }

        //ContextTypes
        [HttpPost("{portalId:guid}/context-type")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult<Guid>> AddContextType([FromRoute] Guid portalId, [FromBody] ApiAddContextTypeToPortalRequest request)
        {
            try
            {
                await Mediator.Send(request.ToCommand(portalId));
            }
            catch (NotFoundException ex)
            {
                return FusionApiError.NotFound(portalId, ex.Message);
            }
            catch (InvalidActionException ex)
            {
                return FusionApiError.InvalidOperation("500", ex.Message);
            }
            catch (Exception)
            {
                return FusionApiError.InvalidOperation("500", "An error occurred while adding portal app");
            }

            return Ok();
        }
        //[HttpDelete("{workSurfaceId:guid}/apps/{appKey}")]
        [HttpDelete("{portalId:guid}/context-type/{contextType}")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        public async Task<ActionResult> RemoveContextType([FromRoute] Guid portalId, [FromRoute] string contextType)
        {
            var request = new ApiRemovePortalContextType();
            try
            {
                await Mediator.Send(request.ToCommand(portalId, contextType));
            }
            catch (NotFoundException ex)
            {
                return FusionApiError.NotFound(portalId, ex.Message);
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
