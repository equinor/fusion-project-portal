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
    public const int DescriptionLengthMax = 4000;

    private readonly List<PortalApp> _apps = new();

    public OnboardedContext(string externalId, string type, string? description)
    {
        ExternalId = externalId;
        Type = type;
        Description = description;
    }

    public string ExternalId { get; }
    public string Type { get; } // TODO: Necessary? Type can alternatively be resolved by Fusion Context
    public string? Description { get; set; }

    public IReadOnlyCollection<PortalApp> Apps => _apps.AsReadOnly();

    public void Update(string? description)
    {
        Description = description;
    }
}
