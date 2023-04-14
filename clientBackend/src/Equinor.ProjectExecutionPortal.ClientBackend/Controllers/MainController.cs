using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.ClientBackend.Controllers
{
    public class MainController : Controller
    {
        private readonly ILogger<MainController> _logger;

        public MainController(ILogger<MainController> logger)
        {
            _logger = logger;
        }

        [Authorize]
        public Task<IActionResult> Index()
        {
            return Task.FromResult<IActionResult>(View());
        }

        [Authorize]
        public Task<IActionResult> Static()
        {
            return Task.FromResult<IActionResult>(View());
        }
    }
}
