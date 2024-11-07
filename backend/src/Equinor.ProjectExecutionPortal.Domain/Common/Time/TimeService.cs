using Equinor.ProjectExecutionPortal.Domain.Interfaces;

namespace Equinor.ProjectExecutionPortal.Domain.Common.Time;

public static class TimeService
{
    private static ITimeProvider _sProvider = null!;

    public static DateTime UtcNow => _sProvider.UtcNow;

    public static void SetProvider(ITimeProvider provider)
    {
        if (provider == null)
        {
            throw new ArgumentNullException(nameof(provider));
        }

        if (provider.UtcNow.Kind != DateTimeKind.Utc)
        {
            throw new ArgumentException("Time must be in UTC format");
        }

        _sProvider = provider;
    }
}
