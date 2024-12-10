using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApps;

namespace Equinor.ProjectExecutionPortal.Application.Services.AppService
{
    public interface IAppService
    {
        Task<OnboardedAppDto> EnrichWithFusionAppData(OnboardedAppDto onboardedApp, CancellationToken cancellationToken);

        Task<List<OnboardedAppDto>> EnrichWithFusionAppData(List<OnboardedAppDto> apps, CancellationToken cancellationToken);
    }
}
