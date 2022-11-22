namespace Equinor.ProjectExecutionPortal.Domain.Common.Time;

public interface ITimeProvider
{
    DateTime UtcNow { get; }
}
