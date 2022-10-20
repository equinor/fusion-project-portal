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

    public async Task<IList<ApiFusionPortalAppInformation>> TryGetFusionPortalApps()
    {
        var url = $"{_baseAddress}/apps/" +
                  $"?api-version={_apiVersion}";

        var oldAuthType = _authenticator.AuthenticationType;
        _authenticator.AuthenticationType = AuthenticationType.AsApplication;

        try
        {
            return await _fusionPortalApiClient.TryQueryAndDeserializeAsync<List<ApiFusionPortalAppInformation>>(url);
        }
        finally
        {
            _authenticator.AuthenticationType = oldAuthType;
        }
    }

    public async Task<ApiFusionPortalAppInformation> TryGetFusionPortalApp(string appKey)
    {
        var url = $"{_baseAddress}/apps/" + 
                  $"{appKey}" +
                  $"?api-version={_apiVersion}";

        var oldAuthType = _authenticator.AuthenticationType;
        _authenticator.AuthenticationType = AuthenticationType.AsApplication;

        try
        {
            return await _fusionPortalApiClient.TryQueryAndDeserializeAsync<ApiFusionPortalAppInformation>(url);
        }
        finally
        {
            _authenticator.AuthenticationType = oldAuthType;
        }
    }
}
