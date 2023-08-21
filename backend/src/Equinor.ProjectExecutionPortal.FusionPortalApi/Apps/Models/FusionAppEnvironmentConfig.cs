using System.Text.Json.Serialization;

namespace Equinor.ProjectExecutionPortal.FusionPortalApi.Apps.Models
{
    public class FusionAppEnvironmentConfig
    {
        [JsonPropertyName("environment")]
        public object Environment { get; set; } = new ();

        [JsonPropertyName("endpoints")]
        public Dictionary<string, string> Endpoints { get; set; } = new();

        [JsonPropertyName("tag")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Tag { get; set; }

        [JsonPropertyName("invalidConfig")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public bool? InvalidConfig { get; set; }

        [JsonPropertyName("error")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Error { get; set; }
    }
}
