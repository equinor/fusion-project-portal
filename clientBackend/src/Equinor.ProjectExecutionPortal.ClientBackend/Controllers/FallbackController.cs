using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.ClientBackend.Controllers
{
    public class FallbackController : Controller
    {
        private readonly ILogger<FallbackController> _logger;

        public FallbackController(ILogger<FallbackController> logger)
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
