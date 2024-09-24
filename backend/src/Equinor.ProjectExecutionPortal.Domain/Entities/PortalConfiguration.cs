using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Audit;

namespace Equinor.ProjectExecutionPortal.Domain.Entities;

/// <summary>
/// Each portal has their own configuration
/// </summary>
public class PortalConfiguration : AuditableEntityBase, ICreationAuditable, IModificationAuditable
{
    public const int RouterLengthMax = 8000;

    public PortalConfiguration(string? router)
    {
        Router = router;
    }

    public string? Router { get; set; }

    public Guid PortalId { get; set; }
    public Portal Portal { get; set; } = null!;

    public void Update(string? router)
    {
        Router = router;
    }
}
