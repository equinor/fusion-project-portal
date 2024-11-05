using Equinor.ProjectExecutionPortal.Application.Infrastructure.Mappings;
using Equinor.ProjectExecutionPortal.Application.Queries.ContextTypes;
using Fusion.Integration.Apps.Abstractions.Models;

namespace Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApps;

public class OnboardedAppDto : IMapFrom<Domain.Entities.OnboardedApp>
{
    public Guid Id { get; set; }
    public required string AppKey { get; set; }
    public string? DisplayName { get; set; }
    public string? Description { get; set; }
    public App? AppInformation { get; set; }
    public IList<ContextTypeDto> ContextTypes { get; set; } = [];

    public void SupplyWithFusionData(App app)
    {
        DisplayName = app.DisplayName;
        Description = app.Description;
        AppInformation = app;
    }
}
