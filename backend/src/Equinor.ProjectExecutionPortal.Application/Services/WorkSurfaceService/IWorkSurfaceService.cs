using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface;

namespace Equinor.ProjectExecutionPortal.Application.Services.WorkSurfaceService
{
    public interface IWorkSurfaceService
    {
        List<WorkSurfaceAppGroupWithAppsDto> MapWorkSurfaceToAppGroups(WorkSurfaceDto workSurface);
    }
}
