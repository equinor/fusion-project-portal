using Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.RemoveWorkSurfaceApp;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurface
{
    public class ApiRemoveWorkSurfaceAppRequest
    {
        public RemoveWorkSurfaceAppCommand ToCommand(Guid workSurfaceId, string? contextExternalId, string appKey)
        {
            return new RemoveWorkSurfaceAppCommand(workSurfaceId, contextExternalId, appKey);
        }
    }
}
