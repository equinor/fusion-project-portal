using Fusion.Integration.Profile;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Data;

internal static class FusionProfileApiData
{
    public static Guid NonExistentAzureUniquePersonId = new (UserData.NonExistentUserId);
    public static Guid ValidAzureUniquePersonId = new(UserData.AuthenticatedUserWithPortalAdminId);

    public static readonly ResolvedPersonProfile ValidResolvedProfile = new(new FusionPersonProfile(FusionAccountType.External, string.Empty, ValidAzureUniquePersonId, "Some Name"))
    {
        Identifier = ValidPerson,
        Success = true,
        StatusCode = 200,
        Profile = new FusionPersonProfile(FusionAccountType.External, string.Empty, ValidAzureUniquePersonId, "Name"),
        Message = string.Empty
    };

    public static PersonIdentifier ValidPerson => new(ValidAzureUniquePersonId);

    public static List<ResolvedPersonProfile> ValidFusionProfiles => [ValidResolvedProfile];
}
