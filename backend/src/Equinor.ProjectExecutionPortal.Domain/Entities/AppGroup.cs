using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Audit;

namespace Equinor.ProjectExecutionPortal.Domain.Entities;

/// <summary>
/// An Application Group acts as a grouping and ordering of selected portal applications
/// </summary>
public class AppGroup : AuditableEntityBase, ICreationAuditable, IModificationAuditable
{
    public const int NameLengthMax = 200;
    public const int AccentColorLengthMax = 7;

    private readonly List<OnboardedApp> _apps = new();

    public AppGroup(string name, int order, string accentColor)
    {
        Name = name;
        Order = order;
        AccentColor = accentColor;
    }

    public string Name { get; set; }
    public int Order { get; set; }
    public string AccentColor { get; set; }

    public IReadOnlyCollection<OnboardedApp> Apps => _apps.AsReadOnly();

    public void Update(string name, string accentColor)
    {
        Name = name;
        AccentColor = accentColor;
    }

    public void AddApp(OnboardedApp app)
    {
        _apps.Add(app);
    }

    public void ReorderApps(List<Guid> reorderedAppIds)
    {
        foreach (var (orderedAppId, index) in reorderedAppIds.Select((value, i) => (value, i)))
        {
            var currentApp = _apps.Single(x => x.Id == orderedAppId);
            currentApp.Order = index;
        }
    }
}
