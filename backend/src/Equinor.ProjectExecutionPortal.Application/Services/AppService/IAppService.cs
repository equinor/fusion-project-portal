using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaceApplication;

namespace Equinor.ProjectExecutionPortal.Application.Services.AppService
{
    public interface IAppService
    {
        Task<IList<WorkSurfaceApplicationDto>> EnrichWithFusionAppData(IList<WorkSurfaceApplicationDto> applications, CancellationToken cancellationToken);
    }
}
