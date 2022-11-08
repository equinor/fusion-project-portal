using Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.RemoveWorkSurfaceApp;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.Admin
{
    public class ApiRemoveWorkSurfaceAppRequest
    {
        public RemoveWorkSurfaceAppCommand ToCommand(Guid workSurfaceId, string? externalContextId, string appKey)
        {
            return new RemoveWorkSurfaceAppCommand(workSurfaceId, externalContextId, appKey);
        }
    }
}
