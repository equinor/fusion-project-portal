using Equinor.ProjectExecutionPortal.Application.Infrastructure.Mappings;
using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Accounts;

public class PortalAdminDto : AuditDto, IMapFrom<PortalAdmin>
{
    public Guid Id { get; set;  }
    public Guid PortalId { get; set; }
    public Guid AccountId { get; set; }
    public AccountDto? Account { get; set; }
}
