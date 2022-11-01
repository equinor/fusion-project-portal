using Fusion.Integration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiVersion("0.1")]
    [Route("api/contexts")]
    public class ContextController : ApiControllerBase
    {
        [HttpGet("{externalId}")]
        public async Task<ActionResult<FusionContext>> Context(string externalId)
        {
            // E.g. FC5FFCBC-392F-4D7E-BB14-79A006579337
            var contextIdentifier = ContextIdentifier.FromExternalId(externalId);
            var context = await ContextResolver.ResolveContextAsync(contextIdentifier, FusionContextType.ProjectMaster);

            if (context == null)
            {
                return FusionApiError.NotFound(externalId, "Could not find context by external id");
            }

            return context;
        }
    }
}
