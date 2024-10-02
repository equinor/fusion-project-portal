using Equinor.ProjectExecutionPortal.Application.Infrastructure.Mappings;
using Equinor.ProjectExecutionPortal.Application.Queries.ContextTypes;
using Fusion.Integration.Apps.Abstractions.Models;

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
    public string DisplayName { get; set; }
    public string Description { get; set; }
    public App? AppInformation { get; set; }
    public IList<ContextTypeDto> ContextTypes { get; set; }

    public void SupplyWithFusionData(App app, FusionPortalAppInformationAmount amount)
    {
        // TODO: Move this to separate API models
        switch (amount)
        {
            case FusionPortalAppInformationAmount.All:
                AppInformation = app;
                break;

            case FusionPortalAppInformationAmount.Minimal:
                AppKey = app.AppKey;
                DisplayName = app.DisplayName;
                Description = app.Description;
                AppInformation = null;

                break;

            default:
                throw new ArgumentOutOfRangeException(nameof(amount), amount, null);
        }
    }
}
