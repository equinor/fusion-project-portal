using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface.GetWorkSurface;
using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface.GetWorkSurfaces;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurface;
using Fusion.Integration;
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
        [HttpGet("{workSurfaceId:guid}/{contextExternalId}")]
        public async Task<ActionResult<ApiWorkSurface>> WorkSurface([FromRoute] Guid workSurfaceId, [FromRoute] string? contextExternalId)
        {
            if (contextExternalId != null)
            {
                var contextIdentifier = ContextIdentifier.FromExternalId(contextExternalId);
                var context = await ContextResolver.ResolveContextAsync(contextIdentifier, FusionContextType.ProjectMaster);

                if (context == null)
                {
                    return FusionApiError.NotFound(contextExternalId, "Could not find context by external id");
                }
            }

            var workSurfaceWithAppsDto = await Mediator.Send(new GetWorkSurfaceWithAppsQuery(workSurfaceId, contextExternalId));

            if (workSurfaceWithAppsDto == null)
            {
                return FusionApiError.NotFound(workSurfaceId, "Could not find work surface");
            }

            return new ApiWorkSurface(workSurfaceWithAppsDto);
        }
    }
}
