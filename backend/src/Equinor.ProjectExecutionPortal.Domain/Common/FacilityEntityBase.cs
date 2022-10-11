namespace Equinor.ProjectExecutionPortal.Domain.Common;

/// <summary>
/// Base class for entities to be filtered by context
/// </summary>
///
/// Should be compatible with Fusion Context
public abstract class FacilityEntityBase : EntityBase
{
    public const int FacilityLengthMax = 255;
    public const int FacilityLengthMin = 5;

    protected FacilityEntityBase(string facility) => Facility = facility;

    public virtual string Facility { get; }
}
