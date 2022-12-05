using Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.DeleteAppGroup;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.AppGroup
{
    public class ApiDeleteAppGroupRequest
    {
        public DeleteAppGroupCommand ToCommand(Guid appGroupId)
        {
            return new DeleteAppGroupCommand(appGroupId);
        }
    }
}
