using Equinor.ProjectExecutionPortal.Domain.Common;

namespace Equinor.ProjectExecutionPortal.Infrastructure.Entities;

/// <summary>
/// A portal link to an external resource of relevance
/// </summary>
public class WorkSurfaceLink : AuditableEntityBase
{
    public WorkSurfaceLink(string facility, string title, string uri, int order) : base(facility)
    {
        Title = title;
        Uri = uri;
        Order = order;
    }

    public string Title { get; set; }
    public string Uri { get; set; }
    public int Order { get; set; }
}
