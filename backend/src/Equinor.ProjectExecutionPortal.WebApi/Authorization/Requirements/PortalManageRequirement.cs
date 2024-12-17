using Equinor.ProjectExecutionPortal.Application.Services.PortalService;
using Fusion;
using Fusion.Authorization;
using Microsoft.AspNetCore.Authorization;

namespace Equinor.ProjectExecutionPortal.WebApi.Authorization.Requirements;

public class PortalManageRequirement : FusionAuthorizationRequirement
{
    public override string Description => "User must be either a portal admin or global admin";
    public override string Code => "PortalAdmins";

    public class Handler : AuthorizationHandler<PortalManageRequirement, Guid>
    {
        private readonly IPortalService _portalService;

        public Handler(IPortalService portalService)
        {
            _portalService = portalService;
        }

        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, PortalManageRequirement requirement, Guid portalId)
        {
            var userOId = context.User.GetAzureUniqueIdOrThrow();

            var isGlobalAdmin = context.User.IsInRole(Scopes.ProjectPortalAdmin);

            if (isGlobalAdmin)
            {
                context.Succeed(requirement);
            }

            var isPortalAdmin = await _portalService.UserIsAdmin(portalId, userOId);

            if (isPortalAdmin)
            {
                context.Succeed(requirement);
            }
            else
            {
                requirement.SetEvaluation("User is not portal owner");
            }
        }
    }
}
