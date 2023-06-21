using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers
{
    [ApiController]
    [Route("metrics")]
    public class MetricsController : ControllerBase
    {
        // Radix calls this endpoint when monitoring is true in radixconfig.yaml
        // For now, just return Ok to avoid it triggering a failed request in app insights
        // Can later consider if we need more exciting metrics, see the following link for more info:
        // - https://www.radix.equinor.com/guides/monitoring/#metrics-visualisation

        [HttpGet]
        public IActionResult GetMetrics()
        {
            return Ok();
        }
    }
}
