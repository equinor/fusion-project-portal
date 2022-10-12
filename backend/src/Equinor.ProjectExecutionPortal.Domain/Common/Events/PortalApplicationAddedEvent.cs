using Equinor.ProjectExecutionPortal.Domain.Entities;
using MediatR;

namespace Equinor.ProjectExecutionPortal.Domain.Common.Events;

public class PortalApplicationAddedEvent : INotification
{
    public PortalApplicationAddedEvent(WorkSurfaceApplication workSurfaceApplication)
    {
        WorkSurfaceApplication = workSurfaceApplication;
    }

    public WorkSurfaceApplication WorkSurfaceApplication { get; }
}
