using Equinor.ProjectExecutionPortal.Infrastructure;
using Fusion.Infrastructure.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.WebApi.Authorization.Requirements
{
    public class PortalAdminOrOwnerRequirement : IAuthorizationRequirement
    {
        public class Handler : AuthorizationHandler<PortalAdminOrOwnerRequirement>
        {
            private readonly ProjectExecutionPortalContext _context;

            public Handler(ProjectExecutionPortalContext context)
            {
                _context = context;
            }

            protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, PortalAdminOrOwnerRequirement requirement)
            {
                var userId = context.User.GetUniqueId();

                if (!userId.HasValue)
                {
                    return;
                }

                var isAdmin = await _context.PortalAdmins.AnyAsync(a => a.AzureUniqueId == userId.Value);
                //var isOwner = await _context.Portals.AnyAsync(a => a.CreatedByAzureUniqueId == userId.Value);

                if (isAdmin)// || isOwner)
                {
                    context.Succeed(requirement);
                }
            }
        }
    }
}
