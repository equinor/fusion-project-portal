namespace Equinor.ProjectExecutionPortal.Application.Queries;

public class AuditDto
{
    public DateTime CreatedAtUtc { get; set; }
    //public PersonDto? CreatedBy { get; set; }
    public DateTime? ModifiedAtUtc { get; set; }
    //public PersonDto? ModifiedBy { get; set; }
}
