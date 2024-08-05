using Equinor.ProjectExecutionPortal.Domain.Entities;
using MediatR;

namespace Equinor.ProjectExecutionPortal.Domain.Common.Events;

public class PortalApplicationAddedEvent : INotification
{
    public PortalApplicationAddedEvent(PortalApp portalApp)
    {
        PortalApp = portalApp;
    }

    public PortalApp PortalApp { get; }
}
