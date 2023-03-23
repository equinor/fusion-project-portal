using System.Diagnostics;
using Equinor.ProjectExecutionPortal.ClientBackend.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web;

namespace Equinor.ProjectExecutionPortal.ClientBackend.Controllers
{
    public class MainController : Controller
    {
        private readonly ILogger<MainController> _logger;

        private const string AuthSchemes = OpenIdConnectDefaults.AuthenticationScheme + "," +
                                           JwtBearerDefaults.AuthenticationScheme;

        public MainController(ILogger<MainController> logger)
        {
            _logger = logger;
        }

        [AllowAnonymous]
        //[AuthorizeForScopes(Scopes = new string[] { })]
        public async Task<IActionResult> Index([FromServices] ITokenAcquisition tokenProvider)
        {
            //var scopes = new string[] { };
            //var accessToken = await tokenProvider.GetAccessTokenForUserAsync(scopes);

            //ViewData["accessToken"] = accessToken;

            return View();
        }

        //public IActionResult Index()
        //{
        //    return View("./test.html");
        //}

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
