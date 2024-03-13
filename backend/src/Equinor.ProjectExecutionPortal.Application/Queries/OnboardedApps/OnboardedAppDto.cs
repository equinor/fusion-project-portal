using Equinor.ProjectExecutionPortal.Application.Infrastructure.Mappings;
using Equinor.ProjectExecutionPortal.Application.Queries.AppGroups;
using Equinor.ProjectExecutionPortal.Application.Queries.ContextTypes;
using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps.Models;

namespace Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApps;

public enum FusionPortalAppInformationAmount
{
    Minimal,
    All
}

public class OnboardedAppDto : IMapFrom<Domain.Entities.OnboardedApp>
{
    public Guid Id { get; set; }
    public string AppKey { get; set; }
    public int Order { get; set; }
    public bool IsLegacy { get; set; }
    public AppGroupDto AppGroup { get; set; }
    public FusionPortalAppInformation? AppInformation { get; set; }
    public IList<ContextTypeDto> ContextTypes { get; set; }

    public void SupplyWithFusionData(FusionPortalAppInformation appInformation, FusionPortalAppInformationAmount amount)
    {
        switch (amount)
        {
            case FusionPortalAppInformationAmount.All:
                AppInformation = appInformation;
                break;

            case FusionPortalAppInformationAmount.Minimal:
                var appInfo = new FusionPortalAppInformation
                {
                    Key = appInformation.Key,
                    Name = appInformation.Name,
                    Description = appInformation.Description
                };

                AppInformation = appInfo;

                break;

            default:
                throw new ArgumentOutOfRangeException(nameof(amount), amount, null);
        }
    }
}
