namespace Equinor.ProjectExecutionPortal.Domain.Common;

/// <summary>
/// Base class for entities to be filtered by context
/// </summary>
///
/// Should be compatible with Fusion Context
public abstract class ContextEntityBase : EntityBase
{
    protected ContextEntityBase(Guid contextId) => ContextId = contextId;

    public virtual Guid ContextId { get; }
}
