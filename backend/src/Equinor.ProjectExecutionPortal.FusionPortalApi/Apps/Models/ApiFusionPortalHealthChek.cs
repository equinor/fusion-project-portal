using System.Text.Json.Serialization;

namespace Equinor.ProjectExecutionPortal.FusionPortalApi.Apps.Models
{
    public class ApiFusionPortalHealthChek
    {
        [JsonPropertyName("url")]
        public string Url { get; set; }
    }
}
