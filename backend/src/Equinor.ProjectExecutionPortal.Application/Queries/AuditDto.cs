namespace Equinor.ProjectExecutionPortal.Application.Queries;

public class AuditDto
{
    public DateTime CreatedAtUtc { get; set; }
    public Guid CreatedByAzureOid { get; set; }
    public DateTime? ModifiedAtUtc { get; set; }
    public Guid? ModifiedByAzureOid { get; set; }
}
