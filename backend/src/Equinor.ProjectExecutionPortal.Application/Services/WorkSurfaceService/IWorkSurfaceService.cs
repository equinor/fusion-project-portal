using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaces;

namespace Equinor.ProjectExecutionPortal.Application.Services.WorkSurfaceService
{
    public interface IWorkSurfaceService
    {
        List<WorkSurfaceAppGroupWithAppsDto>? MapWorkSurfaceToAppGroups(WorkSurfaceDto workSurface);
    }
}
