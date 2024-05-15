using Equinor.ProjectExecutionPortal.Domain.Entities;
using MediatR;

namespace Equinor.ProjectExecutionPortal.Domain.Common.Events;

public class PortalApplicationAddedEvent : INotification
{
    public PortalApplicationAddedEvent(PortalApp workSurfaceApp)
    {
        WorkSurfaceApp = workSurfaceApp;
    }

    public PortalApp WorkSurfaceApp { get; }
}
