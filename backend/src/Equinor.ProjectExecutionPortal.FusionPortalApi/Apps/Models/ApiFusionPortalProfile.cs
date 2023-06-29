using System.Text.Json.Serialization;

namespace Equinor.ProjectExecutionPortal.FusionPortalApi.Apps.Models
{
    public class ApiFusionPortalProfile
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("upn")]
        public string Upn { get; set; }

        [JsonPropertyName("mail")]
        public string Mail { get; set; }

        [JsonPropertyName("applicationId")]
        public Guid ApplicationId { get; set; }

        [JsonPropertyName("type")]
        public string Type { get; set; }
    }
}
