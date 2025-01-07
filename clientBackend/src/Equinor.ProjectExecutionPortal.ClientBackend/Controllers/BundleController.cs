using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.ClientBackend.Controllers;

public class BundleController : Controller
{
    [Authorize]
    [HttpGet("/authentication/{*anything}")]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public Task<IActionResult> Index()
    {
        return Task.FromResult<IActionResult>(View());
    }
}
