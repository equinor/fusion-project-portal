using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Audit;

namespace Equinor.ProjectExecutionPortal.Domain.Entities;

/// <summary>
/// Each portal has their own configuration
/// </summary>
public class PortalConfiguration : AuditableEntityBase, ICreationAuditable, IModificationAuditable
{
    public PortalConfiguration(string? router, string? extension, string? environment)
    {
        Router = router;
        Extension = extension;
        Environment = environment;
    }

    public const int RouterLengthMax = 8000;
    public const int ExtensionLengthMax = 8000;
    public const int EnvironmentLengthMax = 8000;

    public string? Router { get; set; }
    public string? Extension { get; set; }
    public string? Environment { get; set; }

    public Guid PortalId { get; set; }
    public Portal Portal { get; set; } = null!;

    public void Update(string? router, string? extension, string? environment)
    {
        Router = router;
        Extension = extension;
        Environment = environment;
    }
}
