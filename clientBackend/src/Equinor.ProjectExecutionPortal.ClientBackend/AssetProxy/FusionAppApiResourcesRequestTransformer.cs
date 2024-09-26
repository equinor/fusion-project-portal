﻿using Equinor.ProjectExecutionPortal.ClientBackend.Configurations;
using Fusion;
using Microsoft.Extensions.Options;
using Microsoft.Identity.Web;
using Yarp.ReverseProxy.Forwarder;
using Yarp.ReverseProxy.Transforms;

namespace Equinor.ProjectExecutionPortal.ClientBackend.AssetProxy
{
    public class FusionAppApiResourcesRequestTransformer : HttpTransformer
    {
        private readonly ITokenAcquisition _tokenAcquisition;
        private readonly AssetProxyOptions _options;

        public FusionAppApiResourcesRequestTransformer(ITokenAcquisition tokenAcquisition, IOptions<AssetProxyOptions> options)
        {
            _tokenAcquisition = tokenAcquisition;
            _options = options.Value;
        }

        public override async ValueTask TransformRequestAsync(HttpContext httpContext, HttpRequestMessage proxyRequest, string destinationPrefix)
        {
            var token = await _tokenAcquisition.GetAccessTokenForAppAsync(_options.TokenScope!);
            var path = httpContext.Request.Path.Value?.Replace(Constants.FusionAppsRoute, string.Empty);

            // Copy all request headers
            await base.TransformRequestAsync(httpContext, proxyRequest, destinationPrefix);

            // Customize the query string:
            var queryContext = new QueryTransformContext(httpContext.Request);

            // Assign the custom uri. Be careful about extra slashes when concatenating here. RequestUtilities.MakeDestinationAddress is a safe default.
            proxyRequest.RequestUri = RequestUtilities.MakeDestinationAddress(_options.FusionAppsUrl!, path, queryContext.QueryString);

            proxyRequest.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
            proxyRequest.Headers.Add("X-Fusion-App-Bundle-UniqueId", $"{httpContext.User.GetAzureUniqueId()}");

            // Suppress the original request header, use the one from the destination Uri.
            proxyRequest.Headers.Host = null;
        }
    }
}
