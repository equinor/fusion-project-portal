using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Audit;

namespace Equinor.ProjectExecutionPortal.Domain.Entities;

/// <summary>
/// An onboarded app is an app that is ready for use for the project portal.
/// These apps can then be added to Work Surfaces
/// </summary>
public class OnboardedApp : AuditableEntityBase, ICreationAuditable, IModificationAuditable
{
    public const int AppKeyLengthMax = 200;
    private readonly List<ContextType> _contextTypes = new();

    public OnboardedApp(string appKey, int order, bool isLegacy)
    {
        AppKey = appKey;
        Order = order;
        IsLegacy = isLegacy;
    }

    /// <summary>
    /// AppKey referes to the app's unique ID in the Fusion Portal
    /// </summary>
    public string AppKey { get; set; }

    /// <summary>
    /// Order is contextually based on AppGroup.
    /// This means that multiple onboarded apps can have the same order (but different AppGroup)
    /// </summary>
    public int Order { get; set; }

    /// <summary>
    /// This flag is used for conditional rendering of legacy apps on the client application
    /// </summary>
    public bool IsLegacy { get; set; }

    public Guid AppGroupId { get; set; }
    public AppGroup AppGroup { get; set; }

    public IReadOnlyCollection<ContextType> ContextTypes => _contextTypes.AsReadOnly();

    public void Update(bool isLegacy, Guid appGroupId)
    {
        IsLegacy = isLegacy;
        AppGroupId = appGroupId;
    }

    public void AddContextTypes(IList<ContextType> contextTypes)
    {
        _contextTypes.Clear();
        _contextTypes.AddRange(contextTypes);
    }
    public void AddContextType(ContextType contextType)
    {
        _contextTypes.Add(contextType);
    }

    public void RemoveContextType(ContextType contextType)
    {
        _contextTypes.Remove(contextType);
    }
}
