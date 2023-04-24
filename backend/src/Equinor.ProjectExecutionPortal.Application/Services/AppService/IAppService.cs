﻿using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApp;
using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps.Models;

namespace Equinor.ProjectExecutionPortal.Application.Services.AppService
{
    public interface IAppService
    {
        Task<bool> FusionAppExist(string appKey, CancellationToken cancellationToken);

        Task<IList<ApiFusionPortalAppInformation>> GetFusionApps();

        Task<IList<OnboardedAppDto>> EnrichAppsWithFusionAppData(IList<OnboardedAppDto> apps, CancellationToken cancellationToken);
    }
}
