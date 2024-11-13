using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Interfaces;
using MediatR;

namespace Equinor.ProjectExecutionPortal.Application.Events.Common;

public class EventDispatcher : IEventDispatcher
{
    private readonly IMediator _mediator;

    public EventDispatcher(IMediator mediator) => _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));

    public async Task DispatchAsync(IEnumerable<EntityBase> entities, CancellationToken cancellationToken = default)
    {
        if (entities == null)
        {
            throw new ArgumentNullException(nameof(entities));
        }
        var entityList = entities.ToList();

        var domainEvents = entityList
            .SelectMany(x => x.DomainEvents)
            .ToList();

        entityList
            .ForEach(entity => entity.ClearDomainEvents());

        foreach (var notification in domainEvents)
        {
            await _mediator.Publish(notification, cancellationToken);
        }
    }
}
