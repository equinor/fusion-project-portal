using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers
{
    public class WorkSurfaceController : Controller
    {
        [HttpGet("/work-surface/apps")]
        public IActionResult Apps()
        {
            return Json("yo");
        }
    }
}
