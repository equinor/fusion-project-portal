using Equinor.ProjectExecutionPortal.Application.Queries.Portals;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal;

public class ApiPortalAdmin
{
#pragma warning disable CS8618 // For integration tests only
    public ApiPortalAdmin() { }
#pragma warning restore CS8618 // For integration tests only

    public ApiPortalAdmin(PortalAdminDto adminDto)
    {
        Id = adminDto.Id;
        AzureUniqueId = adminDto.AzureUniqueId;
    }

    public Guid Id { get; set; }
    public Guid AzureUniqueId { get; set; }
}
