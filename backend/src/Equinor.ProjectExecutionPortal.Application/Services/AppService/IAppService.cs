using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApps;

namespace Equinor.ProjectExecutionPortal.Application.Services.AppService
{
    public interface IAppService
    {
        Task<OnboardedAppDto> EnrichWithFusionAppData(OnboardedAppDto onboardedApp, CancellationToken cancellationToken);

        Task<IList<OnboardedAppDto>> EnrichWithFusionAppData(IList<OnboardedAppDto> apps, CancellationToken cancellationToken);
    }
}
