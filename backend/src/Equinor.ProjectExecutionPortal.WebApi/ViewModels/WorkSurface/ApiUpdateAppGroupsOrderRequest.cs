using Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.UpdateAppGroupsOrder;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurface
{
    public class ApiUpdateAppGroupsOrderRequest
    {
        public List<Guid> ReorderedAppGroupIds { get; set; }

        public UpdateAppGroupsOrderCommand ToCommand(Guid workSurfaceId)
        {
            return new UpdateAppGroupsOrderCommand(workSurfaceId, ReorderedAppGroupIds);
        }
    }
}
