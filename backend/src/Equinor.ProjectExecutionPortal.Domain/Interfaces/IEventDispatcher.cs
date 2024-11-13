using Equinor.ProjectExecutionPortal.Domain.Common;

namespace Equinor.ProjectExecutionPortal.Domain.Interfaces;

public interface IEventDispatcher
{
    Task DispatchAsync(IEnumerable<EntityBase> entities, CancellationToken cancellationToken = default);
}
