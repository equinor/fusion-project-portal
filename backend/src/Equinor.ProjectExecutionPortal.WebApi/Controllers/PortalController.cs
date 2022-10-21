using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps;
using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps.Models;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels;
using Fusion;
using Fusion.Infrastructure.Authentication;
using Fusion.Infrastructure.Internal.Configuration;
using Fusion.Infrastructure.ServiceDiscovery;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers
{
    //[Authorize(AuthorizationPolicies.COOKIE)]
    public class PortalController : ApiControllerBase
    {
        [HttpGet("/fusion-apps")]
        public async Task<ActionResult<IList<ApiFusionPortalAppInformation>>> GetFusionPortalApps([FromServices] IFusionPortalApiService fusionPortalApiService)
        {
            try
            {
                var apps = await fusionPortalApiService.TryGetFusionPortalApps();

                return apps.ToList();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        //[HttpGet("/")]
        //[HttpGet("/apps/{*anything}")]
        //[HttpGet("/authentication/{*anything}")]
        //public async Task<ViewResult> Index(
        //    [FromServices] IRuntimeOptions<EndpointConfig> endpointOptions,
        //    [FromServices] IConfiguration configurationAccessor,
        //    [FromServices] IWebHostEnvironment env)
        //{
        //    var clientId = configurationAccessor.GetConfig(FusionConfig.AzureAd.ClientId);
        //    var fusionPortalClientId = configurationAccessor.GetConfig(FusionConfig.FusionPortalClientId);
        //    var domain = configurationAccessor.GetConfig(FusionConfig.AzureAd.Domain);
        //    var instrumentationKey = configurationAccessor.GetConfig(FusionConfig.ApplicationInsights.InstrumentationKey);
        //    var endpointConfig = await endpointOptions.GetValueAsync();
        //    var envName = configurationAccessor.GetConfig(FusionConfig.GeneralConfig.Environment);
        //    var pullRequestNr = configurationAccessor.GetConfig(FusionConfig.GeneralConfig.PullRequest);
        //    var isProduction = envName is "FPRD" or "PROD";
        //    var agGridLicenseKey = configurationAccessor.GetConfig(FusionConfig.AgGrid.LicenseKey);

        //    var viewModel = new PortalIndexViewModel(
        //        envName,
        //        pullRequestNr,
        //        isProduction,
        //        clientId,
        //        JsonConvert.SerializeObject(new Dictionary<string, string>
        //        {
        //            { "org-chart", endpointConfig.GetOrg() },
        //            { "meeting-v2", endpointConfig.GetMeetingV2() },
        //            { "task", endpointConfig.GetTasks() },
        //            { "people", endpointConfig.GetPeople() },
        //            { "data-proxy", endpointConfig.GetDataProxy() },
        //            { "projects", endpointConfig.GetProjects() },
        //            { "fusiontasks", endpointConfig.GetFusionTasks() },
        //            { "roles", endpointConfig.GetRoles() },
        //            { "reports", endpointConfig.GetReports() },
        //            { "context", endpointConfig.GetContext() },
        //            { "az-function-utility", endpointConfig.GetFunctionUtility() },
        //            { "line-org", endpointConfig["line-org"] },
        //            { "notification", endpointConfig["notification"] },
        //            { "info-app", endpointConfig["info-app"] },
        //            { "bookmarks", endpointConfig["bookmarks"] },
        //            { "contract-personnel", endpointConfig["contract-personnel"] },
        //        }),
        //        domain,
        //        User.GetUserPrincipalName() ?? User.GetMail(),
        //        instrumentationKey,
        //        fusionPortalClientId,
        //        agGridLicenseKey
        //    );

        //    if (IsInternetExplorer())
        //    {
        //        return View("Index.IE", viewModel);
        //    }

        //    if (env.IsDevelopment())
        //    {
        //        return View("Index.Dev", viewModel);
        //    }

        //    return View(viewModel);
        //}

        internal bool IsInternetExplorer()
        {
            var userAgent = Request.Headers["User-Agent"].ToString();
            return (userAgent.Contains("MSIE") || userAgent.Contains("Trident"));
        }
    }
}
