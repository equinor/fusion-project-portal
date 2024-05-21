using Equinor.ProjectExecutionPortal.Application.Commands.Portals.RemoveContextAppFromPortal;
using Equinor.ProjectExecutionPortal.Application.Commands.Portals.RemoveGlobalAppFromPortal;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.PortalApp
{
    public class ApiRemovePortalAppRequest
    {
        public RemoveContextAppFromPortalCommand ToCommand(Guid workSurfaceId, Guid contextId, string appKey)
        {
            return new RemoveContextAppFromPortalCommand(workSurfaceId, contextId, appKey);
        }

        public RemoveGlobalAppFromPortalCommand ToCommand(Guid workSurfaceId, string appKey)
        {
            return new RemoveGlobalAppFromPortalCommand(workSurfaceId, appKey);
        }
    }
}
