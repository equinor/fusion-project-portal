using Equinor.ProjectExecutionPortal.Application.Queries;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels;

public class ApiAudit
{
#pragma warning disable CS8618 // For integration tests only
    public ApiAudit()
#pragma warning restore CS8618 // For integration tests only
    {
    }

    public DateTime CreatedAtUtc { get; set; }
    public Guid CreatedByAzureOid { get; set; }
    public DateTime? ModifiedAtUtc { get; set; }
    public Guid? ModifiedByAzureOid { get; set; }

    protected void ApplyAudit(AuditDto auditDto)
    {
        CreatedAtUtc = auditDto.CreatedAtUtc;
        CreatedByAzureOid = auditDto.CreatedByAzureOid;
        ModifiedAtUtc = auditDto.ModifiedAtUtc;
        ModifiedByAzureOid = auditDto.ModifiedByAzureOid;
    }
}
