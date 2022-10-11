using Fusion.Infrastructure;
using Fusion.Infrastructure.Authentication;
using Fusion.Infrastructure.Internal.Configuration;
using Fusion.Infrastructure.Internal.Services.Authentication;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.IdentityModel.Clients.ActiveDirectory;

namespace Equinor.ProjectExecutionPortal.WebApi.Authorization
{
    public class OpenIdConnectHandlers
    {
        public static Task OnRedirectToIdentityProviderAsync(RedirectContext context)
        {
            // Redirect to implicit flow
            var redirectUrl = $"https://{context.Request.Host}/signin-implicit";

            context.Properties.Items.Add(OpenIdConnectDefaults.RedirectUriForCodePropertiesKey, redirectUrl);
            var state = context.Options.StateDataFormat.Protect(context.Properties);

            var implicitSigninUrl = $"{UrlUtility.CombineUrl(context.Options.Authority, "/oauth2/authorize")}?" +
                $"client_id={context.Options.ClientId}&" +
                $"response_type=id_token+code&" +
                $"redirect_uri={UrlUtility.EncodeUrl(redirectUrl)}&" +
                $"scope=openid profile email&" +
                $"response_mode=fragment&" +
                $"state={state}&" +
                $"domain_hint=organizations&" +
                $"nonce={context.ProtocolMessage.Nonce}";

            var forceLogin = !string.IsNullOrEmpty(context.Request.Query["force-login"]);

            if (forceLogin)
            {
                implicitSigninUrl += "&prompt=login";

                var loginHint = context.Request.Query["login-hint"];
                if (!string.IsNullOrEmpty(loginHint))
                {
                    implicitSigninUrl += $"&login_hint={UrlUtility.EncodeUrl(loginHint)}";
                }
            }

            context.Response.Redirect(implicitSigninUrl);

            context.HandleResponse();

            return Task.CompletedTask;
        }

        public static async Task OnAuthorizationCodeReceivedAsync(AuthorizationCodeReceivedContext context)
        {
            var config = context.HttpContext.RequestServices.GetRequiredService<IConfiguration>();
            var certThumbprint = config.GetConfig(FusionConfig.GeneralConfig.CertThumbprint);

            var clientId = context.Options.ClientId;
            var authority = context.Options.Authority;

            var uniqueUserId = context.Principal?.GetUniqueId();

            if (!uniqueUserId.HasValue)
            {
                throw new ArgumentNullException("user.uniqueUserId", "Could not locate unique user id in claims for user signing in.");
            }

            var tokenCacheFactory = context.HttpContext.RequestServices.GetRequiredService<ITokenCacheFactory>();
            var tokenCache = await tokenCacheFactory.CacheForUser(uniqueUserId.Value);

            var cert = PfxProvider.GetCertificate(config);
            var cac = new ClientAssertionCertificate(clientId, cert);

            var authContext = new AuthenticationContext(authority, tokenCache);

            var result = await authContext.AcquireTokenByAuthorizationCodeAsync(
                context.TokenEndpointRequest.Code,
                new Uri(context.TokenEndpointRequest.RedirectUri, UriKind.RelativeOrAbsolute),
                cac,
                clientId);

            // Notify the OIDC middleware that we already took care of code redemption.
            context.HandleCodeRedemption(result.AccessToken, result.IdToken);
        }

        public static Task OnRemoteSignOut(RemoteSignOutContext context)
        {
            context.Response.Redirect("/");

            return Task.FromResult(0);
        }

        public static Task AuthenticationFailed(AuthenticationFailedContext context)
        {
            return Task.FromResult(0);
        }
    }
}
