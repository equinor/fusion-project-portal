using Microsoft.Extensions.Options;
using Microsoft.Identity.Web;
using Yarp.ReverseProxy.Forwarder;
using Yarp.ReverseProxy.Transforms;

namespace Equinor.ProjectExecutionPortal.WebApi.AssetProxy
{
    public class ProfileImageRequestTransformer : HttpTransformer
    {
        private readonly ITokenAcquisition _tokenAcquisition;
        private readonly AssetProxyOptions _options;

        public ProfileImageRequestTransformer(ITokenAcquisition tokenAcquisition, IOptions<AssetProxyOptions> options)
        {
            _tokenAcquisition = tokenAcquisition;
            _options = options.Value;
        }

        public override async ValueTask TransformRequestAsync(HttpContext httpContext, HttpRequestMessage proxyRequest, string destinationPrefix)
        {
            var uniqueId = httpContext.Request.RouteValues["uniqueId"];

            var token = await _tokenAcquisition.GetAccessTokenForAppAsync(_options.TokenScope!);

            // Copy all request headers
            await base.TransformRequestAsync(httpContext, proxyRequest, destinationPrefix);

            // Customize the query string:
            var queryContext = new QueryTransformContext(httpContext.Request);
            queryContext.Collection.Add("api-version", "2.0");

            // Assign the custom uri. Be careful about extra slashes when concatenating here. RequestUtilities.MakeDestinationAddress is a safe default.
            proxyRequest.RequestUri = RequestUtilities.MakeDestinationAddress(_options.FusionPeopleUrl!, $"/persons/{uniqueId}/photo", queryContext.QueryString);

            proxyRequest.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

            // Suppress the original request header, use the one from the destination Uri.
            proxyRequest.Headers.Host = null;
        }

        public override ValueTask<bool> TransformResponseAsync(HttpContext httpContext, HttpResponseMessage? proxyResponse)
        {
            // Could remove duplicate headers here
            return base.TransformResponseAsync(httpContext, proxyResponse);
        }
    }
}
