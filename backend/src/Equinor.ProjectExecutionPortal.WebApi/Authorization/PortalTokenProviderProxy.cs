#nullable enable

using Fusion;
using Fusion.Integration.Configuration;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;

namespace Equinor.ProjectExecutionPortal.WebApi.Authorization
{
    public class PortalTokenProviderProxy : IFusionTokenProvider
    {
        private readonly ITokenProvider _infraTokenProvider;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public PortalTokenProviderProxy(ITokenProvider infraTokenProvider, IHttpContextAccessor httpContextAccessor)
        {
            this._infraTokenProvider = infraTokenProvider;
            this._httpContextAccessor = httpContextAccessor;
        }

        public Task<string> GetApplicationTokenAsync() => _infraTokenProvider.GetAppAccessTokenAsync();

        public Task<string> GetApplicationTokenAsync(string resource) => _infraTokenProvider.GetAppAccessTokenAsync(resource);

        public async Task<string> GetDelegatedToken()
        {
            // If the user has been signed in, let the normal token provider handle the request, as all pre-reqs are present.
            if (_httpContextAccessor.HttpContext != null && _httpContextAccessor.HttpContext.User.Identity?.IsAuthenticated == true)
            {
                return await _infraTokenProvider.GetAccessTokenAsync();
            }

            if (_httpContextAccessor.HttpContext is null)
            {
                throw new InvalidOperationException("HttpContext cannot be null when getting delegated access token");
            }

            // We do not have a signed in user and we're getting a token to "fusion" resource, we should be safe to just forward the access token we already have.
            var requestToken = await GetRequestTokenAsync(_httpContextAccessor.HttpContext);

            // Try to get token from the oidc schema. This works even if the user is not currently authenticated.
            // Will authenticate using the specified schema. We are most likely hitting this during the claims transformer, however this scenario is handled in the integration lib
            // by checking if the transformer is currently running.
            if (requestToken is null)
            {
                // We have to run the authenticate call instead of GetTokenAsync, as the token fetched from cookie will be expired eventually.
                // Sign the user in and use the object id to fetch a new token using the token cache and refresh token.
                var authResult = await _httpContextAccessor.HttpContext.AuthenticateAsync(OpenIdConnectDefaults.AuthenticationScheme);
                if (authResult.Succeeded && authResult.Principal is not null)
                {
                    var nativeToken = await _infraTokenProvider.GetAccessTokenAsync(null, authResult.Principal.GetAzureUniqueIdOrThrow());
                    requestToken = nativeToken;
                }
            }

            if (requestToken is null)
            {
                throw new InvalidOperationException("Could not locate any bearer token to forward.");
            }

            return requestToken;
        }

        public Task<string> GetDelegatedToken(string resource) => _infraTokenProvider.GetAccessTokenAsync(resource);

        private static async Task<string?> GetRequestTokenAsync(HttpContext context)
        {
            if (context.Request.Headers.TryGetValue("authorization", out var authorizationHeaderValues))
            {
                var bearerToken = authorizationHeaderValues.FirstOrDefault(v => v.StartsWith("bearer", StringComparison.OrdinalIgnoreCase));
                return bearerToken?["bearer ".Length..]?.Trim();
            }

            try
            {
                var jwtToken = await context.GetTokenAsync(Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, "access_token");
                if (!string.IsNullOrEmpty(jwtToken))
                {
                    return jwtToken;
                }
            }
            catch { /* Best effort */ }

            return null;
        }
    }
}
