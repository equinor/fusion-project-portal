using Equinor.ProjectExecutionPortal.Application.Commands.Portals.SetPortalAsDefault;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal
{
    public class ApiSetPortalAsDefaultRequest
    {
        public SetPortalAsDefaultCommand ToCommand(Guid id)
        {
            return new SetPortalAsDefaultCommand(id);
        }
    }
}
