using Fusion.Integration.Apps.Abstractions.Models;

namespace Equinor.ProjectExecutionPortal.Application.Services.FusionAppsService
{
    public interface IFusionAppsService
    {
        Task<bool> FusionAppExist(string appKey, CancellationToken cancellationToken);

        Task<IList<App>> GetFusionApps();

        Task<App?> GetFusionApp(string appKey);

        Task<AppConfiguration?> GetFusionAppConfig(string appKey);
    }
}
