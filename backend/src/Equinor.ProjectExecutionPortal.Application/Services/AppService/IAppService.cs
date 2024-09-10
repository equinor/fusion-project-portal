﻿using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApps;
using Equinor.ProjectExecutionPortal.Application.Queries.Portals;
using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps.Models;

namespace Equinor.ProjectExecutionPortal.Application.Services.AppService
{
    public interface IAppService
    {
        Task<bool> FusionAppExist(string appKey, CancellationToken cancellationToken);

        Task<IList<FusionPortalAppInformation>> GetFusionApps();

        Task<FusionPortalAppInformation?> GetFusionApp(string appKey);

        Task<FusionAppEnvironmentConfig?> GetFusionAppConfig(string appKey);

        Task<OnboardedAppDto> EnrichAppWithFusionAppData(OnboardedAppDto onboardedApp, CancellationToken cancellationToken);

        Task<IList<OnboardedAppDto>> EnrichAppsWithFusionAppData(IList<OnboardedAppDto> apps, CancellationToken cancellationToken);

        Task<IList<OnboardedAppDto>> EnrichAppsWithAllFusionAppData(IList<OnboardedAppDto> apps, CancellationToken cancellationToken);

        Task<IList<PortalOnboardedAppDto>> SetAppsAsActiveInPortal(IList<PortalOnboardedAppDto> apps, CancellationToken cancellationToken);
    }
}
