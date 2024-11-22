using System.Security.Claims;

namespace Equinor.ProjectExecutionPortal.WebApi.Authorization.Extensions;

public static class ClaimsExtensions
{
    public const string Oid = "http://schemas.microsoft.com/identity/claims/objectidentifier";

    public static Guid? TryGetOid(this IEnumerable<Claim> claims)
    {
        var oidClaim = claims.SingleOrDefault(c => c.Type == Oid);

        if (Guid.TryParse(oidClaim?.Value, out var oid))
        {
            return oid;
        }

        return null;
    }
}
