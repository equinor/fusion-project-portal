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

    public OnboardedApp(string appKey, int order)
    {
        AppKey = appKey;
        Order = order;
    }

    /// <summary>
    /// AppKey referes to the app's unique ID in the Fusion Portal
    /// </summary>
    public string AppKey { get; set; }

    public int Order { get; set; }

    public Guid AppGroupId { get; set; }
    public AppGroup AppGroup { get; set; }
}
