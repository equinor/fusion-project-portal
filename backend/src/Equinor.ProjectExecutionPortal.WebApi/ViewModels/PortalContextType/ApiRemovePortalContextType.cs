using Equinor.ProjectExecutionPortal.Application.Commands.Portals.RemoveContextTypeFromPortal;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.PortalContextType;

public class ApiRemovePortalContextType
{
    public RemoveContextTypeFromPortalCommand ToCommand(Guid portalId, string contextType)
    {
        return new RemoveContextTypeFromPortalCommand(portalId, contextType);
    }
}