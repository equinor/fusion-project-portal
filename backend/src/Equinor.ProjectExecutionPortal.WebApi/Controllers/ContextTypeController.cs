using Equinor.ProjectExecutionPortal.Application.Queries.ContextTypes.GetContextTypes;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.WebApi.Authorization;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.ContextType;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiVersion("0.1")]
    [Route("api/context-types")]
    public class ContextTypeController : ApiControllerBase
    {
        // GET: api/<ContextTypeController>
        [HttpGet("")]
        public async Task<ActionResult<IList<ApiContextType>>> ContextTypes()
        {
            var contextTypesDto = await Mediator.Send(new GetContextTypesQuery());

            return Ok(contextTypesDto.Select(contextTypeDto => new ApiContextType(contextTypeDto)).ToList());
        }

        // POST api/<ContextTypeController>
        [HttpPost("")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
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
                return FusionApiError.InvalidOperation("400", ex.Message);
            }
            catch (Exception)
            {
                return FusionApiError.InvalidOperation("500", "An error occurred while adding context type");
            }

            return Ok();
        }

        // DELETE api/<ContextTypeController>/5
        [HttpDelete("{contextType}")]
        [Authorize(Policy = Policies.ProjectPortal.Admin)]
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
                return FusionApiError.InvalidOperation("400", ex.Message);
            }
            catch (Exception)
            {
                return FusionApiError.InvalidOperation("500", "An error occurred while removing context type");
            }

            return Ok();
        }
    }
}
