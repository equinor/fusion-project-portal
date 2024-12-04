using Fusion.Integration.Profile;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Data;

internal static class FusionProfileApiData
{
    public static Guid ValidProfileAzureUniquePersonId = new(UserData.AuthenticatedUserWithPortalAdminId);

    public static readonly ResolvedPersonProfile ValidResolvedProfile = new(new FusionPersonProfile(FusionAccountType.External, string.Empty, ValidProfileAzureUniquePersonId, "Name"))
    {
        Identifier = ValidProfile,
        Success = true,
        StatusCode = 200,
        Profile = new FusionPersonProfile(FusionAccountType.External, string.Empty, ValidProfileAzureUniquePersonId, "Name"),
        Message = string.Empty
    };

    public static PersonIdentifier ValidProfile => new(ValidProfileAzureUniquePersonId);

    public static List<ResolvedPersonProfile> ValidFusionProfiles => [ValidResolvedProfile];
}
