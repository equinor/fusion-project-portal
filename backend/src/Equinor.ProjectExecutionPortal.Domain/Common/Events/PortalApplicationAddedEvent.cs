using Equinor.ProjectExecutionPortal.Domain.Entities;
using MediatR;

namespace Equinor.ProjectExecutionPortal.Domain.Common.Events;

public class PortalApplicationAddedEvent : INotification
{
    public PortalApplicationAddedEvent(WorkSurfaceApp workSurfaceApp)
    {
        WorkSurfaceApp = workSurfaceApp;
    }

    public WorkSurfaceApp WorkSurfaceApp { get; }
}
