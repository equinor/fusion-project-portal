using Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.ReorderAppGroups;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceAppGroup
{
    public class ApiReorderAppGroupsRequest
    {
        public List<Guid> ReorderedAppGroupIds { get; set; }

        public ReorderAppGroupsCommand ToCommand(Guid workSurfaceId)
        {
            return new ReorderAppGroupsCommand(workSurfaceId, ReorderedAppGroupIds);
        }
    }
}
