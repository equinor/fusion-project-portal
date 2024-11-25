using System.Net.Mime;
using Equinor.ProjectExecutionPortal.Application.Queries.ContextTypes.GetContextTypes;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.WebApi.Authorization;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.ContextType;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers;

[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
[ApiVersion("0.1")]
[Route("api/context-types")]
public class ContextTypeController : ApiControllerBase
{
    [HttpGet("")]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<IList<ApiContextType>>> ContextTypes()
    {
        var contextTypesDto = await Mediator.Send(new GetContextTypesQuery());

        return Ok(contextTypesDto.Select(contextTypeDto => new ApiContextType(contextTypeDto)).ToList());
    }

    [HttpPost("")]
    [Authorize(Policy = Policies.ProjectPortal.Admin)]
    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(void), StatusCodes.Status409Conflict)]
    public async Task<ActionResult<Guid>> AddContextType([FromBody] ApiAddContextTypeRequest request)
    {
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
    [Authorize(Policy = Policies.ProjectPortal.Admin)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> RemoveContextType([FromRoute] string contextType)
    {
        var request = new ApiRemoveContextTypeRequest { Type = contextType };

        try
        {
            await Mediator.Send(request.ToCommand());
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
