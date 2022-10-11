namespace Equinor.ProjectExecutionPortal.Domain.Common.Events.Common;

public interface IEventDispatcher
{
    Task DispatchAsync(IEnumerable<EntityBase> entities, CancellationToken cancellationToken = default);
}
