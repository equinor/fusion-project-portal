using Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.RemoveContextAppFromWorkSurface;
using Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.RemoveGlobalAppFromWorkSurface;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceApp
{
    public class ApiRemoveWorkSurfaceAppRequest
    {
        public RemoveContextAppFromWorkSurfaceCommand ToCommand(Guid workSurfaceId, Guid contextId, string appKey)
        {
            return new RemoveContextAppFromWorkSurfaceCommand(workSurfaceId, contextId, appKey);
        }

        public RemoveGlobalAppFromWorkSurfaceCommand ToCommand(Guid workSurfaceId, string appKey)
        {
            return new RemoveGlobalAppFromWorkSurfaceCommand(workSurfaceId, appKey);
        }
    }
}
