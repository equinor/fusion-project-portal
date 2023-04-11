using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface;
using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Application.Services.WorkSurfaceService
{
    public interface IWorkSurfaceService
    {
        List<WorkSurfaceAppGroupWithAppsDto> MapWorkSurfaceToAppGroups(WorkSurface workSurface);
    }
}
