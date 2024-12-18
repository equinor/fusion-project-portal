﻿using System.Net.Mime;
using Equinor.ProjectExecutionPortal.Application.Queries.ContextTypes.GetContextTypes;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.WebApi.Authorization.Extensions;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.ContextType;
using Fusion.AspNetCore.FluentAuthorization;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers;

[ApiVersion("1.0")]
[Route("api/context-types")]
public class ContextTypeController : ApiControllerBase
{
    [HttpGet("")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<List<ApiContextType>>> GetContextTypes()
    {
        var contextTypesDto = await Mediator.Send(new GetContextTypesQuery());

        return Ok(contextTypesDto.Select(contextTypeDto => new ApiContextType(contextTypeDto)).ToList());
    }

    [HttpPost("")]
    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(void), StatusCodes.Status409Conflict)]
    public async Task<ActionResult<Guid>> AddContextType([FromBody] ApiAddContextTypeRequest request)
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
            return FusionApiError.NotFound(request.Type, ex.Message);
        }
        catch (InvalidActionException ex)
        {
            return FusionApiError.ResourceExists(request.Type, "Context type is already supported", ex);
        }
        catch (Exception)
        {
            return FusionApiError.InvalidOperation("500", "An error occurred while adding context type");
        }

        return Created("Created", request);
    }

    [HttpDelete("{contextType}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> RemoveContextType([FromRoute] string contextType)
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
            await Mediator.Send(new ApiRemoveContextTypeRequest { Type = contextType }.ToCommand());
        }
        catch (NotFoundException ex)
        {
            return FusionApiError.NotFound(contextType, ex.Message);
        }
        catch (InvalidActionException ex)
        {
            return FusionApiError.InvalidOperation("404", ex.Message);
        }
        catch (Exception)
        {
            return FusionApiError.InvalidOperation("500", "An error occurred while removing context type");
        }

        return Ok();
    }
}
