using System.Diagnostics;
using System.Net;
using Fusion.Integration.Authentication;
using Microsoft.AspNetCore.Authentication;
using Yarp.ReverseProxy.Forwarder;

namespace Equinor.ProjectExecutionPortal.WebApi.AssetProxy
{
    public class AssetProxyHandler
    {
        private static readonly HttpMessageInvoker _httpClient = new(new SocketsHttpHandler()
        {
            UseProxy = false,
            AllowAutoRedirect = false,
            AutomaticDecompression = DecompressionMethods.None,
            UseCookies = false,
            ActivityHeadersPropagator = new ReverseProxyPropagator(DistributedContextPropagator.Current)
        });

        private static readonly ForwarderRequestConfig _requestConfig = new() { ActivityTimeout = TimeSpan.FromSeconds(100) };

        private static async Task<bool> AuthenticateOrChallenge(HttpContext httpContext)
        {
            using var scope = new DisableClaimsTransformerScope();

            var auth = await httpContext.AuthenticateAsync();

            if (!auth.Succeeded)
            {
                await httpContext.ChallengeAsync();
                return false;
            }

            return true;
        }

        public static async Task ProxyRequestAsync<TTransformer>(HttpContext httpContext) where TTransformer : HttpTransformer
        {
            if (!await AuthenticateOrChallenge(httpContext))
            {
                return;
            }

            var transformer = httpContext.RequestServices.GetRequiredService<TTransformer>();
            var forwarder = httpContext.RequestServices.GetRequiredService<IHttpForwarder>();

            var error = await forwarder.SendAsync(httpContext, "https://localhost:10000/", _httpClient, _requestConfig, transformer);

            // Check if the operation was successful
            if (error != ForwarderError.None)
            {
                var errorFeature = httpContext.GetForwarderErrorFeature();
                var exception = errorFeature?.Exception;
            }
        }
    }
}
