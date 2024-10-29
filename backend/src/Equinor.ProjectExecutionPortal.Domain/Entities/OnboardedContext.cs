using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Audit;

namespace Equinor.ProjectExecutionPortal.Domain.Entities;

/// <summary>
/// An onboarded context is a context that is enabled for the project portal.
/// Only these contexts can be managed, connect apps, etc.
/// </summary>
public class OnboardedContext(string externalId, string type, string? description) : AuditableEntityBase, ICreationAuditable, IModificationAuditable
{
    public const int ExternalIdLengthMax = 200;
    public const int TypeLengthMax = 200;
    public const int DescriptionLengthMax = 4000;

    private readonly List<PortalApp> _apps = [];

    public string ExternalId { get; } = externalId;
    public string Type { get; } = type; // TODO: Necessary? Type can alternatively be resolved by Fusion Context
    public string? Description { get; set; } = description;

    public IReadOnlyCollection<PortalApp> Apps => _apps.AsReadOnly();

    public void Update(string? description)
    {
        Description = description;
    }
}
