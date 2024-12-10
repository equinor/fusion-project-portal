using Equinor.ProjectExecutionPortal.Application.Services.PortalService;
using Fusion;
using Fusion.Authorization;
using Microsoft.AspNetCore.Authorization;

namespace Equinor.ProjectExecutionPortal.WebApi.Authorization.Requirements;

public class PortalAdminRequirement : FusionAuthorizationRequirement
{
    public override string Description => "User must be an portal admin";
    public override string Code => "PortalAdmins";

    public class Handler : AuthorizationHandler<PortalAdminRequirement, Guid>
    {
        private readonly IPortalService _portalService;

        public Handler(IPortalService portalService)
        {
            _portalService = portalService;
        }

        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, PortalAdminRequirement requirement, Guid portalId)
        {
            var userOId = context.User.GetAzureUniqueIdOrThrow();

            var isAdmin = await _portalService.UserIsAdmin(portalId, userOId);

            if (isAdmin)
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
