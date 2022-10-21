using System.Diagnostics;
using System.Net;
using System.Net.Http.Headers;
using System.Text.Json;
using Equinor.ProjectExecutionPortal.Domain.Interfaces;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Equinor.ProjectExecutionPortal.FusionPortalApi.Client;

public class FusionPortalApiClient : IBearerTokenFusionPortalApiClient
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IBearerTokenProvider _bearerTokenProvider;
    private readonly ILogger<FusionPortalApiClient> _logger;
    private readonly IOptionsMonitor<FusionPortalApiOptions> _options;

    public FusionPortalApiClient(
        IHttpClientFactory httpClientFactory,
        IBearerTokenProvider bearerTokenProvider,
        ILogger<FusionPortalApiClient> logger,
        IOptionsMonitor<FusionPortalApiOptions> options)
    {
        _httpClientFactory = httpClientFactory;
        _bearerTokenProvider = bearerTokenProvider;
        _logger = logger;
        _options = options;
    }

    public async Task<T> TryQueryAndDeserializeAsync<T>(string url) => await QueryAndDeserializeAsync<T>(url, true);

    public async Task<string> TryQueryAsync(string url) => await QueryAsync(url, true);

    private async Task<T> QueryAndDeserializeAsync<T>(string url, bool tryGet)
    {
        var jsonResult = await QueryAsync(url, tryGet);
        var result = JsonSerializer.Deserialize<T>(jsonResult);
        return result;
    }

    private async Task<string> QueryAsync(string url, bool tryGet)
    {
        if (string.IsNullOrEmpty(url))
        {
            throw new ArgumentNullException(nameof(url));
        }

        if (url.Length > 2000)
        {
            throw new ArgumentException("url exceed max 2000 characters", nameof(url));
        }

        var httpClient = await CreateHttpClientAsync();

        var stopWatch = Stopwatch.StartNew();
        var response = await httpClient.GetAsync(url);
        stopWatch.Stop();

        var msg = $"{stopWatch.Elapsed.TotalSeconds}s elapsed when requesting '{url}'. Status: {response.StatusCode}";
        if (!response.IsSuccessStatusCode)
        {
            if (tryGet && response.StatusCode == HttpStatusCode.NotFound)
            {
                _logger.LogWarning(msg);
                return default;
            }
            _logger.LogError(msg);
            throw new Exception($"Requesting '{url}' was unsuccessful. Status={response.StatusCode}");
        }

        _logger.LogInformation(msg);
        var jsonResult = await response.Content.ReadAsStringAsync();
        return jsonResult;
    }

    private async ValueTask<HttpClient> CreateHttpClientAsync()
    {
        var httpClient = _httpClientFactory.CreateClient();
        var bearerToken = await _bearerTokenProvider.GetBearerTokenAsync(_options.CurrentValue.Scope);
        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", bearerToken);
        return httpClient;
    }
}
