using Equinor.ProjectExecutionPortal.Application.Commands.AppGroups.ReorderAppGroups;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.AppGroup
{
    public class ApiReorderAppGroupsRequest
    {
        public List<Guid> ReorderedAppGroupIds { get; set; }

        public ReorderAppGroupsCommand ToCommand()
        {
            return new ReorderAppGroupsCommand(ReorderedAppGroupIds);
        }
    }
}
