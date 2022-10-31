namespace Equinor.ProjectExecutionPortal.WebApi.AssetProxy
{
    public class AssetProxyOptions
    {
        public string? FusionPortalUrl { get; set; } = "https://pro-s-portal-ci.azurewebsites.net";
        public string? FusionPeopleUrl { get; set; } = "https://pro-s-people-ci.azurewebsites.net";
        public string? TokenScope { get; set; } = "5a842df8-3238-415d-b168-9f16a6a6031b/.default";
    }
}
