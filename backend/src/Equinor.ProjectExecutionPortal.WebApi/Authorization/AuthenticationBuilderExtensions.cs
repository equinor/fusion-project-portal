using Fusion;
using Fusion.Infrastructure;
using Fusion.Infrastructure.Authentication;
using Fusion.Infrastructure.Internal.Configuration;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;

namespace Equinor.ProjectExecutionPortal.WebApi.Authorization
{
    internal static class AuthenticationBuilderExtensions
    {
        /// <summary>
        /// Adds the authentication schemas required for this service to performe main signing of user.
        /// </summary>
        /// <param name="config"></param>
        internal static FusionAuthenticationBuilder AddMainPortalSigning(this FusionAuthenticationBuilder fusionAuth, IConfiguration configuration)
        {
            var auth = fusionAuth.authBuilder;

            // We need the cookie schema to store the openidconnect signing info
            auth.AddCookie(o =>
            {
                o.Cookie.HttpOnly = true;
                o.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                o.ForwardChallenge = OpenIdConnectDefaults.AuthenticationScheme;
            });

            // Uncomment this to show hidden "PII" secrets when dealing with auth problems.
            //IdentityModelEventSource.ShowPII = true;

            // Add the openid connect schema, which will challenge and sign in using Azure AD
            auth.AddOpenIdConnect(OpenIdConnectDefaults.AuthenticationScheme, o =>
            {
                o.ClientId = configuration.GetConfig(FusionConfig.AzureAd.ClientId);
                o.Authority = configuration.GetAuthority();
                o.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                o.SaveTokens = true;
                o.NonceCookie.SecurePolicy = CookieSecurePolicy.Always;
                o.CorrelationCookie.SecurePolicy = CookieSecurePolicy.Always;
                o.RemoteSignOutPath = "/sign-out";

                o.ResponseType = OpenIdConnectResponseType.CodeIdToken;

                o.Events = new OpenIdConnectEvents
                {
                    OnRedirectToIdentityProvider = OpenIdConnectHandlers.OnRedirectToIdentityProviderAsync,
                    OnAuthorizationCodeReceived = OpenIdConnectHandlers.OnAuthorizationCodeReceivedAsync,
                    OnAuthenticationFailed = OpenIdConnectHandlers.AuthenticationFailed,
                    OnRemoteSignOut = OpenIdConnectHandlers.OnRemoteSignOut
                };
            });

            // Custom signin schema to support app signin

            auth.AddOpenIdConnect("FusionApp", o =>
            {
                o.ClientId = Guid.NewGuid().ToString();
                o.Authority = configuration.GetAuthority();
                o.CallbackPath = "/signin-oidc-apps";
                o.SaveTokens = true;

                o.Events.OnRedirectToIdentityProvider = (context) =>
                {
                    var redirectUrl = $"https://{context.Request.Host}/signin-apps";
                    var clientId = context.HttpContext.Items["clientId"];

                    // Add custom properties to the state, so we can follow the app through the process.
                    context.Properties.Items.Add("clientId", context.HttpContext.Items["clientId"].ToString());
                    context.Properties.Items.Add("appKey", context.HttpContext.Items["app-key"].ToString());
                    var state = context.Options.StateDataFormat.Protect(context.Properties);

                    var implicitSigninUrl = $"{UrlUtility.CombineUrl(context.Options.Authority, "/oauth2/authorize")}?" +
                        $"client_id={clientId}&" +
                        $"response_type=id_token&" +
                        $"redirect_uri={UrlUtility.EncodeUrl(redirectUrl)}&" +
                        $"scope=openid profile email&" +
                        $"response_mode=fragment&" +
                        $"state={state}&" +
                        $"domain_hint=organizations&" +
                        $"nonce={context.ProtocolMessage.Nonce}";

                    // Try and add login hint
                    var user = context.HttpContext.User.GetUserPrincipalName();
                    if (!string.IsNullOrEmpty(user))
                    {
                        implicitSigninUrl += $"&login_hint={user}";
                    }

                    // Set redirect url for response
                    context.Response.Redirect(implicitSigninUrl);

                    context.HandleResponse();
                    return Task.CompletedTask;
                };

                o.Events.OnMessageReceived = (context) =>
                {
                    // Set the current apps client id as audience, so validation is successfull.
                    var clientId = context.Properties.Items["clientId"];
                    context.Options.TokenValidationParameters.ValidAudience = clientId;

                    return Task.CompletedTask;
                };

                o.Events.OnTicketReceived = (context) =>
                {
                    var redirectUrl = $"https://{context.Request.Host}/app-signed-in";

                    var clientId = context.Properties.Items["clientId"];
                    var appKey = context.Properties.Items["appKey"];

                    var idToken = context.Properties.GetTokenValue(OpenIdConnectParameterNames.IdToken);

                    // Redirect to our view to notify the front end.
                    context.Response.Redirect($"{redirectUrl}#app-key={appKey}&id_token={idToken}");

                    context.HandleResponse();
                    return Task.CompletedTask;
                };
            });

            return fusionAuth;
        }

        internal static FusionAuthenticationBuilder AddPortalAuthorizationPolicies(this FusionAuthenticationBuilder auth)
        {
            // Add an extra auth policy.
            auth.authBuilder.Services.Configure<AuthorizationOptions>(authOpts =>
            {
                authOpts.AddPolicy(AuthorizationPolicies.COOKIE, policy =>
                {
                    policy.AddAuthenticationSchemes(CookieAuthenticationDefaults.AuthenticationScheme);
                    policy.RequireAuthenticatedUser();
                });
            });

            return auth;
        }

        internal static FusionAuthenticationBuilder AddDiscoveryAuthenticationSchema(this FusionAuthenticationBuilder fusionAuth, IConfiguration configuration)
        {
            var auth = fusionAuth.authBuilder;

            auth.AddJwtBearer("DiscoverySchema", setup =>
            {
                setup.Authority = configuration.GetAuthority();
                setup.TokenValidationParameters.ValidAudiences = new[]
                {
                    "ee8b9c45-8803-4948-b023-09a2d2019aa6",
                    "https://discovery.fusion.equinor.com",
                    "5a842df8-3238-415d-b168-9f16a6a6031b",
                    "api://5a842df8-3238-415d-b168-9f16a6a6031b",
                    "97978493-9777-4d48-b38a-67b0b9cd88d2",
                    "api://97978493-9777-4d48-b38a-67b0b9cd88d2"
                };
            });

            return fusionAuth;
        }
    }
}
