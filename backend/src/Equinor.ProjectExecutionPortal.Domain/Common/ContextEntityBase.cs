namespace Equinor.ProjectExecutionPortal.Domain.Common;

/// <summary>
/// Base class for entities to be filtered by context
/// </summary>
public abstract class ContextEntityBase : AuditableEntityEntityBase
{
    protected ContextEntityBase(Guid externalId, string type)
    {
        ExternalId = externalId;
        Type = type;
    }

    public virtual Guid ExternalId { get; }

    public virtual string Type { get; }
}
