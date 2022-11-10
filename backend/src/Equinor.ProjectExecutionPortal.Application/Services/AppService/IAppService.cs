using Equinor.ProjectExecutionPortal.Application.Queries.Portal;
using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface;
using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaceApp;

namespace Equinor.ProjectExecutionPortal.Application.Services.AppService
{
    public interface IAppService
    {
        Task<bool> AppExist(string appKey, CancellationToken cancellationToken);

        Task<PortalDto> EnrichPortalWithFusionAppData(PortalDto portal, CancellationToken cancellationToken);

        Task<WorkSurfaceDto> EnrichWorkSurfaceWithFusionAppData(WorkSurfaceDto workSurface, CancellationToken cancellationToken);

        Task<IList<WorkSurfaceAppDto>> EnrichAppsWithFusionAppData(IList<WorkSurfaceAppDto> apps, CancellationToken cancellationToken);
    }
}
