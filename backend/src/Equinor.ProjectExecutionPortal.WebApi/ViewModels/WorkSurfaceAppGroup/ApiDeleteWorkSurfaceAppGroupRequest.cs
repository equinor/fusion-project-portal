using Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.DeleteAppGroup;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceAppGroup
{
    public class ApiDeleteWorkSurfaceAppGroupRequest
    {
        public DeleteAppGroupCommand ToCommand(Guid appGroupId)
        {
            return new DeleteAppGroupCommand(appGroupId);
        }
    }
}
