namespace Equinor.ProjectExecutionPortal.FusionPortalApi.Client;

public interface IBearerTokenFusionPortalApiClient
{
    Task<T> TryQueryAndDeserializeAsync<T>(string url);

    Task<string> TryQueryAsync(string url);
}
