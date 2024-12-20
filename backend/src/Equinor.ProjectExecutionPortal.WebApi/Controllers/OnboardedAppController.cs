using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApps.GetOnboardedApp;
using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApps.GetOnboardedApps;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.WebApi.Authorization;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedAppContextType;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers;

[ApiVersion("1.0")]
[Route("api/onboarded-apps")]
public class OnboardedAppController : ApiControllerBase
{
    [Authorize(Policy = Policies.Global.Read)]
    [HttpGet("")]
    public async Task<ActionResult<List<ApiOnboardedApp>>> GetOnboardedApps()
    {
        var onboardedAppsDto = await Mediator.Send(new GetOnboardedAppsQuery());

        return Ok(onboardedAppsDto.Select(onboardedAppDto => new ApiOnboardedApp(onboardedAppDto)).ToList());
    }

    [Authorize(Policy = Policies.Global.Read)]
    [HttpGet("{appKey}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ApiOnboardedAppExpanded>> GetOnboardedApp([FromRoute] string appKey)
    {
        var onboardedAppDto = await Mediator.Send(new GetOnboardedAppQuery(appKey));

        if (onboardedAppDto == null)
        {
            return FusionApiError.NotFound(appKey, "Could not find onboarded app");
        }

        return new ApiOnboardedAppExpanded(onboardedAppDto);
    }

    [Authorize(Policy = Policies.Global.Administrate)]
    [HttpPost("")]
    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(void), StatusCodes.Status409Conflict)]
    [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Guid>> OnboardApp([FromBody] ApiOnboardAppRequest request)
    {
        try
        {
            await Mediator.Send(request.ToCommand());
        }
        catch (NotFoundException ex)
        {
            return FusionApiError.NotFound(null, ex.Message);
        }
        catch (InvalidActionException ex)
        {
            return FusionApiError.ResourceExists(request.AppKey, ex.Message, ex);
        }
        catch (InvalidOperationException ex)
        {
            return FusionApiError.InvalidOperation("400", ex.Message);
        }
        catch (Exception)
        {
            return FusionApiError.InvalidOperation("500", "An error occurred while onboarding app");
        }

        return Created();
    }

    [Authorize(Policy = Policies.Global.Administrate)]
    [HttpPut("{appKey}")]
    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Guid>> UpdateOnboardedApp([FromRoute] string appKey, [FromBody] ApiUpdateOnboardedAppRequest request)
    {
        try
        {
            await Mediator.Send(request.ToCommand(appKey));
        }
        catch (NotFoundException ex)
        {
            return FusionApiError.NotFound(appKey, ex.Message);
        }
        catch (InvalidOperationException ex)
        {
            return FusionApiError.InvalidOperation("400", ex.Message);
        }
        catch (Exception)
        {
            return FusionApiError.InvalidOperation("500", "An error occurred while updating the onboarded app");
        }

        return Ok();
    }

    [Authorize(Policy = Policies.Global.Administrate)]
    [HttpDelete("{appKey}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> RemoveOnboardedApp([FromRoute] string appKey)
    {
        try
        {
            await Mediator.Send(new ApiRemoveOnboardedAppRequest { AppKey = appKey }.ToCommand());
        }
        catch (NotFoundException ex)
        {
            return FusionApiError.NotFound(appKey, ex.Message);
        }
        catch (InvalidOperationException ex)
        {
            return FusionApiError.InvalidOperation("400", ex.Message);
        }
        catch (Exception)
        {
            return FusionApiError.InvalidOperation("500", "An error occurred while removing the onboarded app");
        }

        return Ok();
    }

    // ContextTypes

    [Authorize(Policy = Policies.Global.Administrate)]
    [HttpPost("{appKey}/context-type")]
    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(void), StatusCodes.Status409Conflict)]
    [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Guid>> AddContextTypeToOnboardedApp([FromRoute] string appKey, [FromBody] ApiAddContextTypeToOnboardedAppRequest request)
    {
        try
        {
            await Mediator.Send(request.ToCommand(appKey));
        }
        catch (NotFoundException ex)
        {
            return FusionApiError.NotFound(appKey, ex.Message);
        }
        catch (InvalidOperationException ex)
        {
            return FusionApiError.ResourceExists(request.Type, ex.Message, ex);
        }
        catch (InvalidActionException ex)
        {
            return FusionApiError.InvalidOperation("400", ex.Message);
        }
        catch (Exception)
        {
            return FusionApiError.InvalidOperation("500", "An error occurred while adding context-type");
        }

        return Ok();
    }

    [Authorize(Policy = Policies.Global.Administrate)]
    [HttpDelete("{appKey}/context-type/{contextType}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> RemoveContextTypeFromOnboardedApp([FromRoute] string appKey, [FromRoute] string contextType)
    {
        try
        {
            await Mediator.Send(new ApiRemoveOnboardedAppContextType().ToCommand(appKey, contextType));
        }
        catch (NotFoundException ex)
        {
            return FusionApiError.NotFound(appKey, ex.Message);
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
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> OnboardedAppsOptions()
    {
        var verbPolicyMap = new List<(string verb, string policy)>
        {
            (HttpMethod.Get.Method, Policies.Global.Read),
            (HttpMethod.Post.Method, Policies.Global.Administrate),
        };

        await SetAuthorizedVerbsHeader(verbPolicyMap, null);

        return NoContent();
    }

    [HttpOptions("{appKey}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> OnboardedAppOptions(string appKey)
    {
        var verbPolicyMap = new List<(string verb, string policy)>
        {
            (HttpMethod.Get.Method, Policies.Global.Read),
            (HttpMethod.Put.Method, Policies.Global.Administrate),
            (HttpMethod.Delete.Method, Policies.Global.Administrate)
        };

        await SetAuthorizedVerbsHeader(verbPolicyMap, null);

        return NoContent();
    }

    [HttpOptions("{appKey}/context-type")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> OnboardedAppContextTypeOptions(string appKey)
    {
        var verbPolicyMap = new List<(string verb, string policy)>
        {
            (HttpMethod.Post.Method, Policies.Global.Administrate),
        };

        await SetAuthorizedVerbsHeader(verbPolicyMap, null);

        return NoContent();
    }

    [HttpOptions("{appKey}/context-type/{contextType}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> OnboardedAppContextTypeOptions(string appKey, string contextType)
    {
        var verbPolicyMap = new List<(string verb, string policy)>
        {
            (HttpMethod.Delete.Method, Policies.Global.Administrate)
        };

        await SetAuthorizedVerbsHeader(verbPolicyMap, null);

        return NoContent();
    }
}
