using Fusion;
using Fusion.Integration;
using Fusion.Integration.Profile;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers
{
    [ApiVersion("0.1")]
    [Route("api/profile")]
    public class ProfileController : ApiControllerBase
    {
        [HttpGet("")]
        public async Task<ActionResult<FusionPersonProfile>> Profile([FromServices] IFusionProfileResolver profileResolver)
        {
            var userId = User.GetAzureUniqueIdOrThrow();
            var profile = await profileResolver.ResolvePersonFullProfileAsync(userId);

            if (profile == null)
            {
                return FusionApiError.NotFound(userId, "Could not find profile");
            }

            return profile;
        }
    }
}
