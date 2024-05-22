using Equinor.ProjectExecutionPortal.Application.Commands.Portals.RemoveContextAppFromPortal;
using Equinor.ProjectExecutionPortal.Application.Commands.Portals.RemoveGlobalAppFromPortal;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.PortalApp
{
    public class ApiRemovePortalAppRequest
    {
        public RemoveContextAppFromPortalCommand ToCommand(Guid portalId, Guid contextId, string appKey)
        {
            return new RemoveContextAppFromPortalCommand(portalId, contextId, appKey);
        }

        public RemoveGlobalAppFromPortalCommand ToCommand(Guid portalId, string appKey)
        {
            return new RemoveGlobalAppFromPortalCommand(portalId, appKey);
        }
    }
}
