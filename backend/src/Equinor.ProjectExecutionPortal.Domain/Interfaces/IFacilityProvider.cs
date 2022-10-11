using Equinor.ProjectExecutionPortal.Infrastructure.Entities;

namespace Equinor.ProjectExecutionPortal.Domain.Interfaces;

public interface IFacilityProvider
{
    Facility Facility { get; }

    bool IsCrossFacilityQuery { get; }
}
