using Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.SetWorkSurfaceAsDefault;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurface
{
    public class ApiSetWorkSurfaceAsDefaultRequest
    {
        public SetWorkSurfaceAsDefaultCommand ToCommand(Guid id)
        {
            return new SetWorkSurfaceAsDefaultCommand(id);
        }
    }
}
