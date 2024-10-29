using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Audit;

namespace Equinor.ProjectExecutionPortal.Domain.Entities;

/// <summary>
/// Each portal has their own configuration
/// </summary>
public class PortalConfiguration(string? router, string? extension, string? environment) : AuditableEntityBase, ICreationAuditable, IModificationAuditable
{
    public const int RouterLengthMax = 8000;
    public const int ExtensionLengthMax = 8000;
    public const int EnvironmentLengthMax = 8000;

    public string? Router { get; set; } = router;
    public string? Extension { get; set; } = extension;
    public string? Environment { get; set; } = environment;

    public Guid PortalId { get; set; }
    public Portal Portal { get; set; } = null!;

    public void Update(string? router, string? extension, string? environment)
    {
        Router = router;
        Extension = extension;
        Environment = environment;
    }
}
