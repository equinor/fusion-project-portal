using System.Text.Json.Serialization;

namespace Equinor.ProjectExecutionPortal.Domain.AKA
{
    public class AkaRule
    {
        [JsonPropertyName("path")]
        public string Path { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        [JsonPropertyName("type")]
        public AkaRuleType Type { get; set; }

        [JsonPropertyName("regex")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public AkaRegexRule Regex { get; set; }
    }
}
