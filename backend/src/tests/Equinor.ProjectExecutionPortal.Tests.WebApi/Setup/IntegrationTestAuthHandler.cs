using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using Equinor.ProjectExecutionPortal.WebApi.Authorization;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Setup;

internal class IntegrationTestAuthHandler : AuthenticationHandler<IntegrationTestAuthOptions>
{
    public static string TestAuthenticationScheme = "AuthScheme";

    private enum AuthType
    {
        Application,
        Delegated
    }

    public IntegrationTestAuthHandler(
        IOptionsMonitor<IntegrationTestAuthOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        ISystemClock clock)
        : base(options, logger, encoder, clock)
    {
    }

    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        try
        {
            var claims = await GatherTestUserClaimsAsync();
            var testIdentity = new ClaimsIdentity(claims, TestAuthenticationScheme);
            var testUser = new ClaimsPrincipal(testIdentity);
            var ticket = new AuthenticationTicket(testUser, new AuthenticationProperties(), TestAuthenticationScheme);
            // Don't think there is any scenario we want to return 401, as if headers is set, the user is requested.
            return AuthenticateResult.Success(ticket);
        }
        catch (Exception ex)
        {
            return AuthenticateResult.Fail(ex);
        }
    }

    private Task<List<Claim>> GatherTestUserClaimsAsync()
    {
        var authorizationHeader = Request.Headers["Authorization"];
        var tokens = authorizationHeader.ToString().Split(' ');
        if (tokens == null || tokens.Length <= 1)
        {
            throw new Exception("[Authorization] header missing");
        }

        TokenProfile? profile;
        var tokenPart = tokens[1];

        try
        {
            var decoded = Encoding.UTF8.GetString(Convert.FromBase64String(tokenPart));
            profile = JsonConvert.DeserializeObject<TokenProfile>(decoded);
        }
        catch (Exception ex)
        {
            throw new Exception(
                "Unable to extract test auth token from [Authorization] header. See inner exception for details.",
                ex);
        }

        var authType = profile!.IsAppToken ? AuthType.Application : AuthType.Delegated;

        var claims = new List<Claim> { new(ClaimsExtensions.Oid, profile.Oid) };

        switch (authType)
        {
            case AuthType.Delegated:
                claims.Add(new Claim(ClaimTypes.GivenName, profile.FirstName));
                claims.Add(new Claim(ClaimTypes.Surname, profile.LastName));

                if (profile.AppRoles != null)
                {
                    claims.AddRange(profile.AppRoles.Select(role => new Claim(ClaimTypes.Role, role)));
                }
                break;

            case AuthType.Application:
                if (profile.AppRoles != null)
                {
                    claims.AddRange(profile.AppRoles.Select(role => new Claim(ClaimTypes.Role, role)));
                }
                break;
        }

        return Task.FromResult(claims);
    }
}