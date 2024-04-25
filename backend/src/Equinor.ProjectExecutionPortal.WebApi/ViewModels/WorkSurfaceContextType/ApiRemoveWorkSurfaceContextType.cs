using Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.RemoveContextTypeFromWorkSurface;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceContextType
{
    public class ApiRemoveWorkSurfaceContextType
    {
        public RemoveContextTypeFromWorkSurfaceCommand ToCommand(Guid workSurfaceId, string contextType)
        {
            return new RemoveContextTypeFromWorkSurfaceCommand(workSurfaceId, contextType);
        }
    }
}
