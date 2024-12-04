using Equinor.ProjectExecutionPortal.Tests.WebApi.Setup;
using Equinor.ProjectExecutionPortal.WebApi.Authorization;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Data;

internal static class UserData
{
    public const string AuthenticatedUserId = "11111111-0000-0000-0000-222222222222";
    public const string AuthenticatedUserWithPortalAdminId = "22222222-0000-0000-0000-333333333333";
    public const string AdministratorUserId = "66666666-0000-0000-0000-999999999999";

    public static TestUser Anonymous => new()
    {
        Profile = null
    };

    public static TestUser Authenticated => new()
    {
        Profile =
            new TokenProfile
            {
                FirstName = "Authenticated",
                LastName = "Authenticated",
                Oid = AuthenticatedUserId
            },
    };

    public static TestUser AuthenticatedPortalAdmin => new()
    {
        Profile = 
            new TokenProfile
            {
                FirstName = "Portalis",
                LastName = "Administraterson",
                Oid = AuthenticatedUserWithPortalAdminId
            }
    };
    public static TestUser Administrator => new()
    {
        Profile = 
            new TokenProfile
            {
                FirstName = "Admini",
                LastName = "Straterson",
                Oid = AdministratorUserId,
                AppRoles = [Scopes.ProjectPortalAdmin]
            }
    };
}
