using Equinor.ProjectExecutionPortal.Application.Queries.Portal;
using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaceApplication;

namespace Equinor.ProjectExecutionPortal.Application.Services.AppService
{
    public interface IAppService
    {
        Task<PortalDto> EnrichPortalWithFusionAppData(PortalDto portal, CancellationToken cancellationToken);

        Task<IList<WorkSurfaceApplicationDto>> EnrichWithFusionAppData(IList<WorkSurfaceApplicationDto> applications, CancellationToken cancellationToken);
    }
}
