namespace Equinor.ProjectExecutionPortal.FusionPortalApi.Client;

public interface IBearerTokenFusionPortalApiClient
{
    Task<T> TryQueryAndDeserializeAsync<T>(string url);

    Task<T> QueryAndDeserializeAsync<T>(string url);

    Task<byte[]> TryQueryAsByteArrayAsync(string url);
}
