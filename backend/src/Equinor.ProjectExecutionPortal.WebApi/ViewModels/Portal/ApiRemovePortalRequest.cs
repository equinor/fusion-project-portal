using Equinor.ProjectExecutionPortal.Application.Commands.Portals.RemovePortal;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal;

public class ApiRemovePortalRequest
{
    public RemovePortalCommand ToCommand(Guid id)
    {
        return new RemovePortalCommand(id);
    }

}