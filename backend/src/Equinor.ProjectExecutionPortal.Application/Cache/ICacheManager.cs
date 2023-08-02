namespace Equinor.ProjectExecutionPortal.Application.Cache;

public interface ICacheManager
{
    T? Get<T>(string key) where T : class;

    void Remove(string key);

    Task<T> GetOrCreateAsync<T>(string key, Func<Task<T>> fetch, CacheDuration duration, long expiration) where T : class?;
}
