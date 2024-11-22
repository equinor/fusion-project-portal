using Equinor.ProjectExecutionPortal.Application.Services.PortalService;
using Fusion;
using Fusion.Authorization;
using Microsoft.AspNetCore.Authorization;

namespace Equinor.ProjectExecutionPortal.WebApi.Authorization.Requirements;

public class PortalOwnerRequirement : FusionAuthorizationRequirement
{
    public override string Description => "User must be an portal owner";
    public override string Code => "PortalOwners";

    public class Handler : AuthorizationHandler<PortalOwnerRequirement, Guid>
    {
        private readonly IPortalService _portalService;

        public Handler(IPortalService portalService)
        {
            _portalService = portalService;
        }

        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, PortalOwnerRequirement requirement, Guid portalId)
        {
            var userId = context.User.GetAzureUniqueIdOrThrow();

            var isOwner = await _portalService.UserIsOwner(portalId, userId);

            if (isOwner)
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
