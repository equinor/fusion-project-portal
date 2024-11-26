using System.Net.Mime;
using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedContexts.GetOnboardedContext;
using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedContexts.GetOnboardedContexts;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.WebApi.Authorization.Extensions;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedContext;
using Fusion.AspNetCore.FluentAuthorization;
using Fusion.Integration;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers;

[ApiVersion("1.0")]
[Route("api/onboarded-contexts")]
public class OnboardedContextController : ApiControllerBase
{
    [HttpGet("")]
    public async Task<ActionResult<IList<ApiOnboardedContext>>> OnboardedContexts()
    {
        var onboardedContextsDto = await Mediator.Send(new GetOnboardedContextsQuery());

        return Ok(onboardedContextsDto.Select(onboardedContextDto => new ApiOnboardedContext(onboardedContextDto)).ToList());
    }

    [HttpGet("{contextId:guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ApiOnboardedContext>> OnboardedContextByContextId([FromRoute] Guid contextId)
    {
        var onboardedContext = await Mediator.Send(new GetOnboardedContextByContextIdQuery(contextId));

        if (onboardedContext == null)
        {
            return FusionApiError.NotFound(contextId, "Could not find onboarded context");
        }

        return Ok(new ApiOnboardedContext(onboardedContext));
    }

    [HttpGet("{contextExternalId}/type{type}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ApiOnboardedContext>> OnboardedContext([FromRoute] string contextExternalId, string type)
    {
        var onboardedContext = await Mediator.Send(new GetOnboardedContextByExternalIdContextTypeQuery(contextExternalId, type));

        if (onboardedContext == null)
        {
            return FusionApiError.NotFound(contextExternalId, "Could not find onboarded context");
        }

        return Ok(new ApiOnboardedContext(onboardedContext));
    }

    [HttpPost("")]
    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(void), StatusCodes.Status409Conflict)]
    [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<string>> OnboardContext([FromBody] ApiOnboardContextRequest request)
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

        var contextIdentifier = ContextIdentifier.FromExternalId(request.ExternalId);
        var context = await ContextResolver.ResolveContextAsync(contextIdentifier, request.Type);

        if (context == null || context.ExternalId == null)
        {
            return FusionApiError.NotFound(request.ExternalId, "Could not find any context with that external id and context-type");
        }

        try
        {
            await Mediator.Send(request.ToCommand(context.ExternalId, context.Type));
        }
        catch (InvalidActionException ex)
        {
            return FusionApiError.ResourceExists("Context", ex.Message, ex);
        }
        catch (Exception)
        {
            return FusionApiError.InvalidOperation("500", "An error occurred while onboarding context");
        }

        return Ok();
    }

    [HttpPut("{id:guid}")]
    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<string>> UpdateOnboardedContext([FromRoute] Guid id, [FromBody] ApiUpdateOnboardedContextRequest request)
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
            await Mediator.Send(request.ToCommand(id));
        }
        catch (NotFoundException ex)
        {
            return FusionApiError.NotFound(id, ex.Message);
        }
        catch (Exception)
        {
            return FusionApiError.InvalidOperation("500", "An error occurred while updating onboarded context");
        }

        return Ok();
    }

    [HttpDelete("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> RemoveOnboardedContext([FromRoute] Guid id)
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
            await Mediator.Send(new ApiRemoveOnboardedContextRequest { Id = id }.ToCommand());
        }
        catch (NotFoundException ex)
        {
            return FusionApiError.NotFound(id, ex.Message);
        }
        catch (InvalidActionException ex)
        {
            return FusionApiError.InvalidOperation("500", ex.Message);
        }
        catch (Exception)
        {
            return FusionApiError.InvalidOperation("500", "An error occurred while removing onboarded context");
        }

        return Ok();
    }
}
