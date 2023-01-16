using Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.UpdateAppsOrder;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp
{
    public class ApiReorderOnboardedAppsRequest
    {
        public Guid AppGroupId { get; set; }
        public List<Guid> ReorderedAppIds { get; set; }

        public ReorderOnboardedAppsCommand ToCommand()
        {
            return new ReorderOnboardedAppsCommand(AppGroupId, ReorderedAppIds);
        }
    }
}
