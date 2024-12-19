using Equinor.ProjectExecutionPortal.Application.Queries.Portals.GetPortal;
using Equinor.ProjectExecutionPortal.Application.Queries.Portals.GetPortalAppKeys;
using Equinor.ProjectExecutionPortal.Application.Queries.Portals.GetPortalConfiguration;
using Equinor.ProjectExecutionPortal.Application.Queries.Portals.GetPortalOnboardedApp;
using Equinor.ProjectExecutionPortal.Application.Queries.Portals.GetPortalOnboardedApps;
using Equinor.ProjectExecutionPortal.Application.Queries.Portals.GetPortals;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.WebApi.Authorization;
using Equinor.ProjectExecutionPortal.WebApi.Authorization.Extensions;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.PortalApp;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.PortalContextType;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers;

[ApiVersion("1.0")]
[Route("api/portals")]
public class PortalController : ApiControllerBase
{
    [Authorize(Policy = Policies.Global.Read)]
    [HttpGet("")]
    public async Task<ActionResult<List<ApiPortal>>> GetPortals()
    {
        var portalDtos = await Mediator.Send(new GetPortalsQuery());

        return Ok(portalDtos.Select(dto => new ApiPortal(dto)).ToList());
    }

    [Authorize(Policy = Policies.Global.Read)]
    [HttpGet("{portalId:guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ApiPortal>> GetPortal([FromRoute] Guid portalId)
    {
        var portalWithAppsDto = await Mediator.Send(new GetPortalQuery(portalId));

        if (portalWithAppsDto == null)
        {
            return FusionApiError.NotFound(portalId, "Could not find portal");
        }

        return Ok(new ApiPortal(portalWithAppsDto));
    }

    [Authorize(Policy = Policies.Global.Administrate)]
    [HttpPost("")]
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
    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Guid>> UpdatePortal([FromRoute] Guid portalId, [FromBody] ApiUpdatePortalRequest request)
    {
        var authResult = await Request.RequireAuthorizationAsync(portalId, Policies.Global.ManagePortal);

        if (!authResult.Succeeded)
        {
            return CreateForbiddenResponse();
        }

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

    [Authorize(Policy = Policies.Global.Read)]
    [HttpGet("{portalId:guid}/configuration")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ApiPortalConfiguration>> GetPortalConfiguration([FromRoute] Guid portalId)
    {
        var portalConfigurationDto = await Mediator.Send(new GetPortalConfigurationQuery(portalId));

        if (portalConfigurationDto == null)
        {
            return FusionApiError.NotFound(portalId, "Could not find portal");
        }

        return Ok(new ApiPortalConfiguration(portalConfigurationDto));
    }

    [HttpPut("{portalId:guid}/configuration")]
    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Guid>> UpdatePortalConfiguration([FromRoute] Guid portalId, [FromBody] ApiUpdatePortalConfigurationRequest request)
    {
        var authResult = await Request.RequireAuthorizationAsync(portalId, Policies.Global.ManagePortal);

        if (!authResult.Succeeded)
        {
            return CreateForbiddenResponse();
        }

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

    [Authorize(Policy = Policies.Global.Administrate)]
    [HttpDelete("{portalId:guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> RemovePortal([FromRoute] Guid portalId)
    {
        try
        {
            var request = new ApiRemovePortalRequest();
            await Mediator.Send(request.ToCommand(portalId));
        }
        catch (NotFoundException ex)
        {
            return FusionApiError.NotFound(portalId, ex.Message);
        }
        catch (InvalidOperationException ex)
        {
            return FusionApiError.InvalidOperation("500", ex.Message);
        }
        catch (Exception)
        {
            return FusionApiError.InvalidOperation("500", "An error occurred while removing portal");
        }

        return Ok();
    }

    // Onboarded Apps

    [Authorize(Policy = Policies.Global.Read)]
    [HttpGet("{portalId:guid}/onboarded-apps")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<List<ApiPortalOnboardedApp>>> GetOnboardedAppsForPortal([FromRoute] Guid portalId)
    {
        var portalOnboardedAppsDto = await Mediator.Send(new GetPortalOnboardedAppsQuery(portalId));

        if (!portalOnboardedAppsDto.Any())
        {
            return FusionApiError.NotFound(portalId, "Could not find portal with id");
        }

        return Ok(portalOnboardedAppsDto.Select(onboardedAppDto => new ApiPortalOnboardedApp(onboardedAppDto)).ToList());
    }

    [Authorize(Policy = Policies.Global.Read)]
    [HttpGet("{portalId:guid}/onboarded-apps/{appKey}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ApiPortalOnboardedApp>> GetOnboardedAppForPortal([FromRoute] Guid portalId, string appKey)
    {
        var portalOnboardedAppDto = await Mediator.Send(new GetPortalOnboardedAppQuery(portalId, appKey));

        if (portalOnboardedAppDto == null)
        {
            return FusionApiError.NotFound(portalId, "Could not find portal with id or appkey is invalid");
        }

        return new ApiPortalOnboardedApp(portalOnboardedAppDto);
    }

    // Apps

    [Authorize(Policy = Policies.Global.Read)]
    [HttpGet("{portalId:guid}/apps")]
    [HttpGet("{portalId:guid}/contexts/{contextId:guid}/apps")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<List<string>>> GetAppKeysForPortal([FromRoute] Guid portalId, [FromRoute] Guid? contextId)
    {
        try
        {
            if (contextId != null)
            {
                var portalContextualAppKeys = await Mediator.Send(new GetContextualAndGlobalAppKeysByPortalAndContextQuery(portalId, contextId.Value));

                return Ok(portalContextualAppKeys);
            }

            var portalGlobalAppKeys = await Mediator.Send(new GetGlobalAppKeysForPortalQuery(portalId));

            return Ok(portalGlobalAppKeys);
        }
        catch (NotFoundException ex)
        {
            return FusionApiError.NotFound(portalId, ex.Message);
        }
        catch (Exception)
        {
            return FusionApiError.InvalidOperation("500", "An error occurred");
        }
    }

    [HttpPost("{portalId:guid}/apps")]
    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(void), StatusCodes.Status409Conflict)]
    [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Guid>> AddAppToPortal([FromRoute] Guid portalId, [FromBody] ApiAddGlobalAppToPortalRequest request)
    {
        var authResult = await Request.RequireAuthorizationAsync(portalId, Policies.Global.ManagePortal);

        if (!authResult.Succeeded)
        {
            return CreateForbiddenResponse();
        }

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

    [HttpPost("{portalId:guid}/contexts/{contextId:guid}/apps")]
    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(void), StatusCodes.Status409Conflict)]
    [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Guid>> AddAppToPortal([FromRoute] Guid portalId, Guid contextId, [FromBody] ApiAddContextAppToPortalRequest request)
    {
        var authResult = await Request.RequireAuthorizationAsync(portalId, Policies.Global.ManagePortal);

        if (!authResult.Succeeded)
        {
            return CreateForbiddenResponse();
        }

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
    [HttpDelete("{portalId:guid}/contexts/{contextId:guid}/apps/{appKey}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> RemoveAppFromPortal([FromRoute] Guid portalId, [FromRoute] Guid? contextId, [FromRoute] string appKey)
    {
        var authResult = await Request.RequireAuthorizationAsync(portalId, Policies.Global.ManagePortal);

        if (!authResult.Succeeded)
        {
            return CreateForbiddenResponse();
        }

        try
        {
            if (contextId != null)
            {
                await Mediator.Send(new ApiRemovePortalAppRequest().ToCommand(portalId, contextId.Value, appKey));
            }
            else
            {
                await Mediator.Send(new ApiRemovePortalAppRequest().ToCommand(portalId, appKey));
            }
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

    // ContextTypes

    [HttpPost("{portalId:guid}/context-type")]
    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(void), StatusCodes.Status409Conflict)]
    [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Guid>> AddContextTypeToPortal([FromRoute] Guid portalId, [FromBody] ApiAddContextTypeToPortalRequest request)
    {
        var authResult = await Request.RequireAuthorizationAsync(portalId, Policies.Global.ManagePortal);

        if (!authResult.Succeeded)
        {
            return CreateForbiddenResponse();
        }

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
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> RemoveContextTypeFromPortal([FromRoute] Guid portalId, [FromRoute] string contextType)
    {
        var authResult = await Request.RequireAuthorizationAsync(portalId, Policies.Global.ManagePortal);

        if (!authResult.Succeeded)
        {
            return CreateForbiddenResponse();
        }

        try
        {
            var request = new ApiRemovePortalContextType();

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

    [HttpOptions]
    public async Task<IActionResult> PortalsOptions()
    {
        var verbPolicyMap = new List<(string verb, string policy)>
        {
            (HttpMethod.Get.Method, Policies.Global.Read), 
            (HttpMethod.Post.Method, Policies.Global.Administrate)
        };

        await SetAuthorizedVerbsHeader(verbPolicyMap, null);

        return NoContent();
    }

    [HttpOptions("{portalId:guid}")]
    public async Task<IActionResult> PortalOptions(Guid portalId)
    {
        var verbPolicyMap = new List<(string verb, string policy)>
        {
            (HttpMethod.Get.Method, Policies.Global.Read),
            (HttpMethod.Put.Method, Policies.Global.ManagePortal), 
            (HttpMethod.Delete.Method, Policies.Global.ManagePortal)
        };

        await SetAuthorizedVerbsHeader(verbPolicyMap, portalId);

        return NoContent();
    }
}
