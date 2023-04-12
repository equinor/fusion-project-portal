using Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.RemoveContextWorkSurfaceApp;
using Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.RemoveGlobalWorkSurfaceApp;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceApp
{
    public class ApiRemoveWorkSurfaceAppRequest
    {
        public RemoveContextWorkSurfaceAppCommand ToCommand(Guid workSurfaceId, string contextExternalId, string appKey)
        {
            return new RemoveContextWorkSurfaceAppCommand(workSurfaceId, contextExternalId, appKey);
        }

        public RemoveGlobalWorkSurfaceAppCommand ToCommand(Guid workSurfaceId, string appKey)
        {
            return new RemoveGlobalWorkSurfaceAppCommand(workSurfaceId, appKey);
        }
    }
}
