using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.ClientBackend.Controllers
{
    public class BundleController : Controller
    {
        [Authorize]
        [ResponseCache(Duration = 1209600, Location = ResponseCacheLocation.Client)]
        public Task<IActionResult> Index()
        {
            return Task.FromResult<IActionResult>(View());
        }
    }
}
