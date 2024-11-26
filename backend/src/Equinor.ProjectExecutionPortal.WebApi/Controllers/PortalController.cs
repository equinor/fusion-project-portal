using System.Net.Mime;
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
using Fusion.AspNetCore.FluentAuthorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers;

[ApiVersion("1.0")]
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
    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Guid>> CreatePortal([FromBody] ApiCreatePortalRequest request)
    {
        #region Authorization

        var authResult = await Request.RequireAuthorizationAsync(builder =>
        {
            builder.AlwaysAccessWhen().HasPortalsFullControl();
        });

        if (authResult.Unauthorized)
        {
            return authResult.CreateForbiddenResponse();
        }

        #endregion

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
        #region Authorization

        var authResult = await AuthorizeCanModifyPortal(portalId);

        if (authResult.Unauthorized)
        {
            return authResult.CreateForbiddenResponse();
        }

        #endregion

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
    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Guid>> UpdatePortalConfiguration([FromRoute] Guid portalId, [FromBody] ApiUpdatePortalConfigurationRequest request)
    {
        #region Authorization

        var authResult = await AuthorizeCanModifyPortal(portalId);

        if (authResult.Unauthorized)
        {
            return authResult.CreateForbiddenResponse();
        }

        #endregion

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
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> RemovePortal([FromRoute] Guid portalId)
    {
        #region Authorization

        var authResult = await Request.RequireAuthorizationAsync(builder =>
        {
            builder.AlwaysAccessWhen().HasPortalsFullControl();
        });

        if (authResult.Unauthorized)
        {
            return authResult.CreateForbiddenResponse();
        }

        #endregion

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

    // Onboarded Apps

    [HttpGet("{portalId:guid}/onboarded-apps")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<List<ApiPortalOnboardedApp>>> PortalOnboardedApps([FromRoute] Guid portalId)
    {
        var portalOnboardedAppsDto = await Mediator.Send(new GetPortalOnboardedAppsQuery(portalId));

        if (!portalOnboardedAppsDto.Any())
        {
            return FusionApiError.NotFound(portalId, "Could not find portal with id");
        }

        return Ok(portalOnboardedAppsDto.Select(onboardedAppDto => new ApiPortalOnboardedApp(onboardedAppDto)).ToList());
    }

    [HttpGet("{portalId:guid}/onboarded-apps/{appKey}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ApiPortalOnboardedApp>> PortalOnboardedApp([FromRoute] Guid portalId, string appKey)
    {
        var portalOnboardedAppDto = await Mediator.Send(new GetPortalOnboardedAppQuery(portalId, appKey));

        if (portalOnboardedAppDto == null)
        {
            return FusionApiError.NotFound(portalId, "Could not find portal with id or appkey is invalid");
        }

        return new ApiPortalOnboardedApp(portalOnboardedAppDto);
    }

    // Apps

    [HttpGet("{portalId:guid}/apps")]
    [HttpGet("{portalId:guid}/appkeys")] // TODO: DEPRECATED
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<List<string>>> PortalAppKeys([FromRoute] Guid portalId)
    {
        try
        {
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

    [HttpGet("{portalId:guid}/contexts/{contextId:guid}/apps")]
    [HttpGet("{portalId:guid}/contexts/{contextId:guid}/appkeys")] // TODO: DEPRECATED
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<List<string>>> PortalAppKeys([FromRoute] Guid portalId, [FromRoute] Guid contextId)
    {
        try
        {
            var portalContextualAppKeys = await Mediator.Send(new GetContextualAndGlobalAppKeysByPortalAndContextQuery(portalId, contextId));

            return Ok(portalContextualAppKeys);
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
    public async Task<ActionResult<Guid>> AddPortalApp([FromRoute] Guid portalId, [FromBody] ApiAddGlobalAppToPortalRequest request)
    {
        #region Authorization

        var authResult = await AuthorizeCanModifyPortal(portalId);

        if (authResult.Unauthorized)
        {
            return authResult.CreateForbiddenResponse();
        }

        #endregion

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
    public async Task<ActionResult<Guid>> AddPortalApp([FromRoute] Guid portalId, Guid contextId, [FromBody] ApiAddContextAppToPortalRequest request)
    {
        #region Authorization

        var authResult = await AuthorizeCanModifyPortal(portalId);

        if (authResult.Unauthorized)
        {
            return authResult.CreateForbiddenResponse();
        }

        #endregion

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
    public async Task<ActionResult> RemovePortalApp([FromRoute] Guid portalId, [FromRoute] Guid? contextId, [FromRoute] string appKey)
    {
        #region Authorization

        var authResult = await AuthorizeCanModifyPortal(portalId);

        if (authResult.Unauthorized)
        {
            return authResult.CreateForbiddenResponse();
        }

        #endregion

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
        #region Authorization

        var authResult = await AuthorizeCanModifyPortal(portalId);

        if (authResult.Unauthorized)
        {
            return authResult.CreateForbiddenResponse();
        }

        #endregion

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
        #region Authorization

        var authResult = await AuthorizeCanModifyPortal(portalId);

        if (authResult.Unauthorized)
        {
            return authResult.CreateForbiddenResponse();
        }

        #endregion

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

    private async Task<AuthorizationOutcome> AuthorizeCanModifyPortal(Guid portalId)
    {
        var authResult = await Request.RequireAuthorizationAsync(builder =>
        {
            builder.AlwaysAccessWhen().HasPortalsFullControl();

            builder.AnyOf(or =>
            {
                or.BePortalAdmin(portalId);
                or.BePortalOwner(portalId);
            });
        });

        return authResult;
    }
}
