using System.Net.Mime;
using Equinor.ProjectExecutionPortal.Application.Queries.Portals.GetPortal;
using Equinor.ProjectExecutionPortal.Application.Queries.Portals.GetPortalApps;
using Equinor.ProjectExecutionPortal.Application.Queries.Portals.GetPortalConfiguration;
using Equinor.ProjectExecutionPortal.Application.Queries.Portals.GetPortals;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.WebApi.Authorization;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.PortalApp;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.PortalContextType;
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
        public async Task<ActionResult<IList<ApiPortal>>> Portals()
        {
            var portalDtos = await Mediator.Send(new GetPortalsQuery());

            return Ok(portalDtos.Select(dto => new ApiPortal(dto)).ToList());
        }

        [HttpGet("{portalId:guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiPortal>> Portal([FromRoute] Guid portalId)
        {
            var portalWithAppsDto = await Mediator.Send(new GetPortalQuery(portalId));

            if (portalWithAppsDto == null)
            {
                return FusionApiError.NotFound(portalId, "Could not find portal");
            }

            return Ok(new ApiPortal(portalWithAppsDto));
        }

        [HttpPost("")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        [Consumes(MediaTypeNames.Application.Json)]
        [Produces(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Guid>> CreatePortal([FromBody] ApiCreatePortalRequest request)
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
        [Consumes(MediaTypeNames.Application.Json)]
        [Produces(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Guid>> UpdatePortal([FromRoute] Guid portalId, [FromBody] ApiUpdatePortalRequest request)
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

        [HttpGet("{portalId:guid}/configuration")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiPortalConfiguration>> PortalConfiguration([FromRoute] Guid portalId)
        {
            var portalConfigurationDto = await Mediator.Send(new GetPortalConfigurationQuery(portalId));

            if (portalConfigurationDto == null)
            {
                return FusionApiError.NotFound(portalId, "Could not find portal");
            }

            return Ok(new ApiPortalConfiguration(portalConfigurationDto));
        }

        [HttpPut("{portalId:guid}/configuration")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        [Consumes(MediaTypeNames.Application.Json)]
        [Produces(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Guid>> UpdatePortalConfiguration([FromRoute] Guid portalId, [FromBody] ApiUpdatePortalConfigurationRequest request)
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
                return FusionApiError.InvalidOperation("500", "An error occurred while updating portal configuration");
            }

            return Ok();
        }

        [HttpDelete("{portalId:guid}")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> RemovePortalApp([FromRoute] Guid portalId)
        {
            var request = new ApiRemovePortalRequest();

            try
            {
                await Mediator.Send(request.ToCommand(portalId));
            }
            catch (NotFoundException ex)
            {
                return FusionApiError.NotFound(portalId, ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return FusionApiError.Forbidden(ex.Message);
            }
            catch (Exception)
            {
                return FusionApiError.InvalidOperation("500", "An error occurred while removing portal");
            }

            return Ok();
        }

        // Apps

        [HttpGet("{portalId:guid}/apps")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<ApiPortalApp>>> PortalApps([FromRoute] Guid portalId)
        {
            //TODO: improve error handling
            var portalAppsDto = await Mediator.Send(new GetPortalAppsQuery(portalId));

            if (portalAppsDto == null)
            {
                return FusionApiError.NotFound(portalId, "Could not find portal with id");

            }

            var portalApps = portalAppsDto.Apps.DistinctBy(x => x.OnboardedApp.Id);

            return Ok(portalApps.Select(x => new ApiPortalApp(x)).ToList());

        }

        [HttpGet("{portalId:guid}/contexts/{contextId:guid}/apps")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<ApiPortalApp>>> PortalApps([FromRoute] Guid portalId, [FromRoute] Guid contextId)
        {
            //TODO: improve error handling
            var portalAppsDto = await Mediator.Send(new GetPortalAppsWithContextAndGlobalAppsByContextIdQuery(portalId, contextId));

            if (portalAppsDto == null)
            {
                return FusionApiError.NotFound(portalId, "Could not find portal with id");
            }
            
            return Ok(portalAppsDto.Select(x => new ApiPortalApp(x)).ToList());
        }

        [HttpPost("{portalId:guid}/apps")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        [Consumes(MediaTypeNames.Application.Json)]
        [Produces(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(void), StatusCodes.Status409Conflict)]
        [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Guid>> AddPortalApp([FromRoute] Guid portalId, [FromBody] ApiAddGlobalAppToPortalRequest request)
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
                return FusionApiError.ResourceExists(request.AppKey, ex.Message, ex);
            }
            catch (Exception)
            {
                return FusionApiError.InvalidOperation("500", "An error occurred while adding portal app");
            }

            return Ok();
        }

        [HttpPost("{portalId:guid}/contexts/{contextId}/apps")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        [Consumes(MediaTypeNames.Application.Json)]
        [Produces(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(void), StatusCodes.Status409Conflict)]
        [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Guid>> AddPortalApp([FromRoute] Guid portalId, Guid contextId, [FromBody] ApiAddContextAppToPortalRequest request)
        {
            try
            {
                await Mediator.Send(request.ToCommand(portalId, contextId));
            }
            catch (NotFoundException ex)
            {
                return FusionApiError.NotFound(portalId, ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return FusionApiError.InvalidOperation("400", ex.Message);
            }
            catch (InvalidActionException ex)
            {
               return FusionApiError.ResourceExists(request.AppKey, ex.Message, ex);
            }
            catch (Exception)
            {
               return FusionApiError.InvalidOperation("500", "An error occurred while adding portal app");
            }

            return Ok();
        }

        [HttpDelete("{portalId:guid}/apps/{appKey}")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> RemovePortalApp([FromRoute] Guid portalId, [FromRoute] string appKey)
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
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> RemovePortalApp([FromRoute] Guid portalId, Guid contextId, [FromRoute] string appKey)
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
        [Consumes(MediaTypeNames.Application.Json)]
        [Produces(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(void), StatusCodes.Status409Conflict)]
        [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
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
                return FusionApiError.ResourceExists(request.Type, ex.Message, ex);
            }
            catch (InvalidOperationException ex)
            {
                return FusionApiError.InvalidOperation("400", ex.Message);
            }
            catch (Exception)
            {
                return FusionApiError.InvalidOperation("500", "An error occurred while adding portal app");
            }

            return Ok();
        }
        
        [HttpDelete("{portalId:guid}/context-type/{contextType}")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
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
                return FusionApiError.InvalidOperation("400", ex.Message);
            }
            catch (Exception)
            {
                return FusionApiError.InvalidOperation("500", "An error occurred while removing context-type");
            }

            return Ok();
        }
    }
}
