using Equinor.ProjectExecutionPortal.Domain.Common;

namespace Equinor.ProjectExecutionPortal.Domain.Entities;

/// <summary>
/// A portal link to an external resource of relevance
/// </summary>
public class WorkSurfaceLink : AuditableEntityEntityBase
{
    public WorkSurfaceLink(string title, string uri, int order) : base(Guid.NewGuid())
    {
        Title = title;
        Uri = uri;
        Order = order;
    }

    public string Title { get; set; }
    public string Uri { get; set; }
    public int Order { get; set; }
}
