using Equinor.ProjectExecutionPortal.Application.Queries.Portals;

namespace Equinor.ProjectExecutionPortal.Application.Services.PortalService
{
    public interface IPortalService
    {
        List<PortalAppGroupWithAppsDto>? MapPortalToAppGroups(PortalDto portal);
    }
}
