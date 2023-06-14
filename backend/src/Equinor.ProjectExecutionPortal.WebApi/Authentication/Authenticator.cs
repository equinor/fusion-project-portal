using Equinor.ProjectExecutionPortal.Domain.Interfaces;
using Equinor.ProjectExecutionPortal.WebApi.Misc;
using Microsoft.Extensions.Options;
using Microsoft.Identity.Client;

namespace Equinor.ProjectExecutionPortal.WebApi.Authentication;

public class Authenticator : IBearerTokenProvider, IBearerTokenSetter, IAuthenticator
{
    private readonly IOptions<AuthenticatorOptions> _options;
    private readonly ILogger<Authenticator> _logger;
    private string? _requestToken;
    private string? _onBehalfOfUserToken;
    private string? _applicationToken;
    private readonly string _secretInfo;

    public Authenticator(IOptions<AuthenticatorOptions> options, ILogger<Authenticator> logger)
    {
        _options = options;
        _logger = logger;
        var apiSecret = _options.Value.ProjectPortalApiSecret;
        _secretInfo = $"{apiSecret[..2]}***{apiSecret.Substring(apiSecret.Length - 1, 1)}";
        AuthenticationType = AuthenticationType.OnBehalfOf;
    }

    public AuthenticationType AuthenticationType { get; set; }

    public void SetBearerToken(string token) => _requestToken = token;

    public async ValueTask<string> GetBearerTokenAsync(string scope)
    {
        _logger.LogInformation($"Scope setting=[{scope}]");

        return AuthenticationType switch
        {
            AuthenticationType.OnBehalfOf => await GetBearerTokenOnBehalfOfCurrentUserAsync(scope),
            AuthenticationType.AsApplication => await GetBearerTokenForApplicationAsync(scope),
            _ => throw new ArgumentOutOfRangeException()
        };
    }

    private async ValueTask<string> GetBearerTokenOnBehalfOfCurrentUserAsync(string scope)
    {
        if (string.IsNullOrEmpty(_requestToken))
        {
            throw new ArgumentNullException(nameof(_requestToken));
        }

        var app = CreateConfidentialClient();

        var tokenResult = await app
            .AcquireTokenOnBehalfOf(new[] { scope }, new UserAssertion(_requestToken))
            .ExecuteAsync();
        _logger.LogInformation("Got token on behalf of");

        _onBehalfOfUserToken = tokenResult.AccessToken;
        return _onBehalfOfUserToken;
    }

    private async ValueTask<string> GetBearerTokenForApplicationAsync(string scope)
    {
        var app = CreateConfidentialClient();

        var tokenResult = await app
            .AcquireTokenForClient(new[] { scope })
            .ExecuteAsync();
        _logger.LogInformation("Got token for application");

        _applicationToken = tokenResult.AccessToken;
        return _applicationToken;
    }

    private IConfidentialClientApplication CreateConfidentialClient()
    {
        _logger.LogInformation($"Getting client using {_secretInfo} for {_options.Value.ProjectPortalApiClientId}");
        return ConfidentialClientApplicationBuilder
            .Create(_options.Value.ProjectPortalApiClientId)
            .WithClientSecret(_options.Value.ProjectPortalApiSecret)
            .WithAuthority(new Uri(_options.Value.Instance))
            .Build();
    }
}
