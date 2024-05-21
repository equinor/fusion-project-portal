using Equinor.ProjectExecutionPortal.Application.Commands.Portals.RemoveContextTypeFromPortal;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.PortalContextType
{
    public class ApiRemovePortalContextType
    {
        public RemoveContextTypeFromPortalCommand ToCommand(Guid workSurfaceId, string contextType)
        {
            return new RemoveContextTypeFromPortalCommand(workSurfaceId, contextType);
        }
    }
}
