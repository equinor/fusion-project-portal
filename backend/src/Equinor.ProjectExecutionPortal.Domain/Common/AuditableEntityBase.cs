using Equinor.ProjectExecutionPortal.Domain.Common.Time;

namespace Equinor.ProjectExecutionPortal.Domain.Common;

/// <summary>
/// Base class for auditable entities to be filtered by facility
/// </summary>
public abstract class AuditableEntityBase : FacilityEntityBase
{
    protected AuditableEntityBase(string facility) : base(facility)
    {
    }

    public DateTime CreatedAtUtc { get; private set; }
    public Guid? CreatedByAzureOid { get; private set; }
    public DateTime? ModifiedAtUtc { get; private set; }
    public Guid? ModifiedByAzureOid { get; private set; }

    public void SetCreated(Guid createdBy)
    {
        CreatedAtUtc = TimeService.UtcNow;
        CreatedByAzureOid = createdBy;
    }

    public void SetModified(Guid modifiedBy)
    {
        ModifiedAtUtc = TimeService.UtcNow;
        ModifiedByAzureOid = modifiedBy;
    }
}
