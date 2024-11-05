using MediatR;

namespace Equinor.ProjectExecutionPortal.Domain.Common;

/// <summary>
/// Base class for all entities
/// </summary>
public abstract class EntityBase
{
    private List<INotification>? _domainEvents;

    public IReadOnlyCollection<INotification> DomainEvents => _domainEvents?.AsReadOnly() ?? (_domainEvents = []).AsReadOnly();

    public virtual Guid Id { get; protected set; }

    public void AddDomainEvent(INotification eventItem)
    {
        _domainEvents ??= [];
        _domainEvents.Add(eventItem);
    }

    public void RemoveDomainEvent(INotification eventItem) => _domainEvents?.Remove(eventItem);

    public void ClearDomainEvents() => _domainEvents?.Clear();
}
