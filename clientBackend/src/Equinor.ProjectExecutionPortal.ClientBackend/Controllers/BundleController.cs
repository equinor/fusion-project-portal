using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.ClientBackend.Controllers
{
    public class BundleController : Controller
    {
        private readonly ILogger<BundleController> _logger;

        public BundleController(ILogger<BundleController> logger)
        {
            _logger = logger;
        }

        [Authorize]
        public Task<IActionResult> Index()
        {
            return Task.FromResult<IActionResult>(View());
        }
    }
}
