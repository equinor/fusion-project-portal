//using Equinor.ProjectExecutionPortal.ClientBackend.Configurations;
//using Fusion;
//using Microsoft.Extensions.Options;
//using Microsoft.Identity.Web;
//using Yarp.ReverseProxy.Forwarder;
//using Yarp.ReverseProxy.Transforms;

//namespace Equinor.ProjectExecutionPortal.ClientBackend.AssetProxy
//{
//    public class FusionAppRequestTransformer : HttpTransformer
//    {
//        private readonly ITokenAcquisition _tokenAcquisition;
//        private readonly FusionProjectPortalApiOptions _options;

//        public FusionAppRequestTransformer(ITokenAcquisition tokenAcquisition, IOptions<FusionProjectPortalApiOptions> options)
//        {
//            _tokenAcquisition = tokenAcquisition;
//            _options = options.Value;
//        }

//        public override async ValueTask TransformRequestAsync(HttpContext httpContext, HttpRequestMessage proxyRequest, string destinationPrefix)
//        {
//            var appKey = httpContext.Request.RouteValues["appKey"];

//            // THIS IS FOR POC ONLY!
//            // We change the scope to use application permissions
//            var index = _options.Scope.LastIndexOf("/");
//            var input = _options.Scope;
//            if (index >= 0)
//            {
//                input = input.Substring(0, index);
//            }
//            input = $"{input}/.default";

//            //var token = await tokenProvider.GetAccessTokenForUserAsync(new[] { options.TokenScope! }, user: httpContext.User);
//            var token = await _tokenAcquisition.GetAccessTokenForAppAsync(input);

//            // Copy all request headers
//            await base.TransformRequestAsync(httpContext, proxyRequest, destinationPrefix);

//            // Customize the query string:
//            var queryContext = new QueryTransformContext(httpContext.Request);

//            // Assign the custom uri. Be careful about extra slashes when concatenating here. RequestUtilities.MakeDestinationAddress is a safe default.
//            proxyRequest.RequestUri = RequestUtilities.MakeDestinationAddress(_options.BaseAddress!, $"/api/bundles/{appKey}.js", queryContext.QueryString);

//            proxyRequest.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
//            proxyRequest.Headers.Add("X-Fusion-App-Bundle-UniqueId", $"{httpContext.User.GetAzureUniqueId()}");

//            // Suppress the original request header, use the one from the destination Uri.
//            proxyRequest.Headers.Host = null;
//        }

//        public override ValueTask<bool> TransformResponseAsync(HttpContext httpContext, HttpResponseMessage? proxyResponse)
//        {
//            // Could remove duplicate headers here
//            return base.TransformResponseAsync(httpContext, proxyResponse);
//        }
//    }
//}
