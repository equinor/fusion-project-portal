using Equinor.ProjectExecutionPortal.Domain.Interfaces;
using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps.Models;
using Equinor.ProjectExecutionPortal.FusionPortalApi.Client;
using Microsoft.Extensions.Options;

namespace Equinor.ProjectExecutionPortal.FusionPortalApi.Apps;

public class FusionPortalApiService : IFusionPortalApiService
{
    private readonly Uri _baseAddress;
    private readonly string _apiVersion;
    private readonly IBearerTokenFusionPortalApiClient _fusionPortalApiClient;
    private readonly IAuthenticator _authenticator;

    public FusionPortalApiService(
        IBearerTokenFusionPortalApiClient fusionPortalApiClient,
        IOptionsMonitor<FusionPortalApiOptions> options,
        IAuthenticator authenticator)
    {
        _fusionPortalApiClient = fusionPortalApiClient;
        _authenticator = authenticator;
        _baseAddress = new Uri(options.CurrentValue.BaseAddress);
        _apiVersion = options.CurrentValue.ApiVersion;
    }

    public async Task<IList<FusionPortalAppInformation>> TryGetFusionPortalApps()
    {
        var url = $"{_baseAddress}/api/apps/" +
                  $"?api-version={_apiVersion}";

        var oldAuthType = _authenticator.AuthenticationType;
        _authenticator.AuthenticationType = AuthenticationType.AsApplication;

        try
        {
            return await _fusionPortalApiClient.TryQueryAndDeserializeAsync<List<FusionPortalAppInformation>>(url);
        }
        finally
        {
            _authenticator.AuthenticationType = oldAuthType;
        }
    }

    public async Task<FusionPortalAppInformation?> TryGetFusionPortalApp(string appKey)
    {
        var url = $"{_baseAddress}/api/apps/" +
                  $"{appKey}" +
                  $"?api-version={_apiVersion}";

        var oldAuthType = _authenticator.AuthenticationType;
        _authenticator.AuthenticationType = AuthenticationType.AsApplication;

        try
        {
            return await _fusionPortalApiClient.TryQueryAndDeserializeAsync<FusionPortalAppInformation>(url);
        }
        finally
        {
            _authenticator.AuthenticationType = oldAuthType;
        }
    }

    public async Task<FusionAppEnvironmentConfig?> TryGetFusionPortalAppConfig(string appKey)
    {
        var url = $"{_baseAddress}/api/apps/" +
                  $"{appKey}/config" +
                  $"?api-version={_apiVersion}";

        var oldAuthType = _authenticator.AuthenticationType;
        _authenticator.AuthenticationType = AuthenticationType.AsApplication;

        try
        {
            return await _fusionPortalApiClient.TryQueryAndDeserializeAsync<FusionAppEnvironmentConfig>(url);
        }
        finally
        {
            _authenticator.AuthenticationType = oldAuthType;
        }
    }

    public async Task<byte[]> TryGetFusionPortalAppBundle(string appKey)
    {
        var url = $"{_baseAddress}/scripts/apps/" +
                  $"{appKey}" +
                  $"?api-version={_apiVersion}";

        var oldAuthType = _authenticator.AuthenticationType;
        _authenticator.AuthenticationType = AuthenticationType.AsApplication;

        try
        {
            return await _fusionPortalApiClient.TryQueryAsByteArrayAsync(url);
        }
        finally
        {
            _authenticator.AuthenticationType = oldAuthType;
        }
    }
}
