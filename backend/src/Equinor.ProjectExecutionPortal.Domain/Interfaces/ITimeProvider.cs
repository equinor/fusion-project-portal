namespace Equinor.ProjectExecutionPortal.Domain.Interfaces;

public interface ITimeProvider
{
    DateTime UtcNow { get; }
}
