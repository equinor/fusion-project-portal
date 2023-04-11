using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Audit;

namespace Equinor.ProjectExecutionPortal.Domain.Entities;

/// <summary>
/// An onboarded context is a context that is enabled for the project portal.
/// Only these contexts can be managed, connect apps, etc.
/// </summary>
public class OnboardedContext : AuditableEntityBase, ICreationAuditable, IModificationAuditable
{
    public const int ExternalIdLengthMax = 200;
    public const int TypeLengthMax = 200;
    public const int TitleLengthMax = 400;
    public const int DescriptionLengthMax = 4000;

    private readonly List<WorkSurfaceApp> _apps = new();

    public OnboardedContext(string externalId, string type, string? title, string? description)
    {
        ExternalId = externalId;
        Type = type;
        Title = title;
        Description = description;
    }

    public string ExternalId { get; }
    public string Type { get; } // Is this necessary?
    public string? Title { get; set; } // Could this change? Should perhaps be fetched from Fusion Context resolver.
    public string? Description { get; set; }

    public IReadOnlyCollection<WorkSurfaceApp> Apps => _apps.AsReadOnly();

    // TODO: Consider replacing ContextEntityBase with this, making it a direct relation
    // TODO: Image upload

    public void Update(string? description)
    {
        Description = description;
    }
}
