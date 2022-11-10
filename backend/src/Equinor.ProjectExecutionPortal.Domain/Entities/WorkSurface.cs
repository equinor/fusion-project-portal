using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Audit;

namespace Equinor.ProjectExecutionPortal.Domain.Entities;

/// <summary>
/// The portal master object which ties all relevant portal data together
/// </summary>
public class WorkSurface : AuditableEntityBase, ICreationAuditable, IModificationAuditable
{
    public const int KeyLengthMax = 200;
    public const int NameLengthMax = 200;
    public const int ShortNameLengthMax = 50;
    public const int SubTextLengthMax = 200;

    private readonly List<WorkSurfaceApp> _apps = new();
    private readonly List<WorkSurfaceAppGroup> _appGroups = new();

    public WorkSurface(string key, string name, string shortName, string subText, int order, string icon)
    {
        Key = key;
        Name = name;
        ShortName = shortName;
        SubText = subText;
        Order = order;
        Icon = icon;
    }

    public string Key { get; set; }
    public string Name { get; set; }
    public string ShortName { get; set; }
    public string SubText { get; set; }
    public int Order { get; set; }
    public string Icon { get; set; }
    public bool IsDefault { get; set; }

    public Guid PortalId { get; set; }
    public Portal Portal { get; set; }

    public IReadOnlyCollection<WorkSurfaceApp> Apps => _apps.AsReadOnly();
    public IReadOnlyCollection<WorkSurfaceAppGroup> AppGroups => _appGroups.AsReadOnly();

    public void Update(string key, string name, string shortName, string subText, int order, string icon)
    {
        Key = key;
        Name = name;
        ShortName = shortName;
        SubText = subText;
        Order = order;
        Icon = icon;
    }

    public void SetAsDefault()
    {
        IsDefault = true;
    }

    public void UnsetAsDefault()
    {
        IsDefault = false;
    }

    public void AddApp(WorkSurfaceApp app)
    {
        _apps.Add(app);
    }

    public void AddAppGroup(WorkSurfaceAppGroup group)
    {
        _appGroups.Add(group);
    }

    public void ReorderAppGroups(List<Guid> reorderedAppGroupIds)
    {
        foreach (var (orderedAppGroupId, index) in reorderedAppGroupIds.Select((value, i) => (value, i)))
        {
            var currentAppGroup = _appGroups.Single(x => x.Id == orderedAppGroupId);
            currentAppGroup.Order = index;
        }
    }
}
