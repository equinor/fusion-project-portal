using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface.GetWorkSurface;
using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface.GetWorkSurfaces;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurface;
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

            return workSurfaceDtos.Select(dto => new ApiWorkSurface(dto)).ToList();
        }

        [HttpGet("{workSurfaceId:guid}")]
        public async Task<ActionResult<ApiWorkSurface>> Apps([FromRoute] Guid workSurfaceId)
        {
            var workSurfaceDto = await Mediator.Send(new GetWorkSurfaceQuery(workSurfaceId));

            if (workSurfaceDto == null)
            {
                return FusionApiError.NotFound(workSurfaceId, "Could not find work surface");
            }

            return new ApiWorkSurface(workSurfaceDto);
        }
    }
}
