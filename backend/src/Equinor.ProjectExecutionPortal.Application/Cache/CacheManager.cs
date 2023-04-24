using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Internal;

namespace Equinor.ProjectExecutionPortal.Application.Cache;

public class CacheManager : ICacheManager
{
    private readonly IMemoryCache _cache;

    public CacheManager() => _cache = new MemoryCache(new MemoryCacheOptions
    {
        Clock = new CacheClock()
    });

    public T? Get<T>(string key) where T : class => _cache.Get(key) as T;

    public void Remove(string key) => _cache.Remove(key);

    public async Task<T> GetOrCreateAsync<T>(string key, Func<Task<T>> fetch, CacheDuration duration, long expiration) where T : class
    {
        if (_cache.TryGetValue(key, out T instance))
        {
            return instance;
        }

        instance = await fetch.Invoke();
        Add(key, instance, duration, expiration);

        return instance;
    }

    private void Add<T>(string key, T? instance, CacheDuration duration, long expiration) where T : class
    {
        if (instance == null)
        {
            return;
        }

        _cache.Set(key, instance, DateTime.UtcNow.Add(GetExpirationTime(duration, expiration)));
    }

    private static TimeSpan GetExpirationTime(CacheDuration duration, long expiration)
        => duration switch
        {
            CacheDuration.Hours => TimeSpan.FromHours(expiration),
            CacheDuration.Minutes => TimeSpan.FromMinutes(expiration),
            CacheDuration.Seconds => TimeSpan.FromSeconds(expiration),
            _ => throw new NotImplementedException($"Unknown {nameof(CacheDuration)}: {duration}"),
        };

    private class CacheClock : ISystemClock
    {
        public DateTimeOffset UtcNow => DateTimeOffset.UtcNow;
    }
}
