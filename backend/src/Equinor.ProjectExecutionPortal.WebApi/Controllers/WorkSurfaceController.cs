using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps;
using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps.Models;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers
{
    public class WorkSurfaceController : ApiControllerBase
    {
        [HttpGet("/work-surface/apps")]
        public IActionResult Apps()
        {
            return Json("yo");
        }
    }
}
