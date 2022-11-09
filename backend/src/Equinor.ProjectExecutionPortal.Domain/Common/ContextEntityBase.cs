namespace Equinor.ProjectExecutionPortal.Domain.Common;

/// <summary>
/// Base class for entities to be filtered by context
/// </summary>
public abstract class ContextEntityBase : AuditableEntityBase
{
    public const int ExternalIdLengthMax = 200;
    public const int TypeLengthMax = 200;

    protected ContextEntityBase(string? externalId, string? type)
    {
        ExternalId = externalId;
        Type = type;
    }

    public virtual string? ExternalId { get; }

    public virtual string? Type { get; }
}
