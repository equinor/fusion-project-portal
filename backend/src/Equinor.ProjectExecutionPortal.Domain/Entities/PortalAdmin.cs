namespace Equinor.ProjectExecutionPortal.Domain.Entities;

public class PortalAdmin
{
    public Guid Id { get; set; }
    public Guid PortalId { get; set; }
    public Guid AccountId { get; set; }
    public Account Account { get; set; } = null!;
}
