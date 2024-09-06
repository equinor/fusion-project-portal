using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Audit;

namespace Equinor.ProjectExecutionPortal.Domain.Entities;

/// <summary>
/// An onboarded app is an app that is ready for use for the project portal.
/// </summary>
public class OnboardedApp : AuditableEntityBase, ICreationAuditable, IModificationAuditable
{
    public const int AppKeyLengthMax = 200;
    private readonly List<ContextType> _contextTypes = new();
    private readonly List<PortalApp> _apps = new();

    public OnboardedApp(string appKey)
    {
        AppKey = appKey;
    }

    /// <summary>
    /// AppKey refers to the app's unique ID in the Fusion Portal
    /// </summary>
    public string AppKey { get; set; }

    public IReadOnlyCollection<ContextType> ContextTypes => _contextTypes.AsReadOnly();
    public IReadOnlyCollection<PortalApp> Apps => _apps.AsReadOnly();

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
