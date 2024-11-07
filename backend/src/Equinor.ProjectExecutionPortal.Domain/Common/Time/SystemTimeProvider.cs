using Equinor.ProjectExecutionPortal.Domain.Interfaces;

namespace Equinor.ProjectExecutionPortal.Domain.Common.Time;

public class SystemTimeProvider : ITimeProvider
{
    public DateTime UtcNow => DateTime.UtcNow;
}
