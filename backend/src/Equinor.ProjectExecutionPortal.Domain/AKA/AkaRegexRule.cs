using System.Text.Json.Serialization;

namespace Equinor.ProjectExecutionPortal.Domain.AKA
{
    public class AkaRegexRule
    {
        [JsonPropertyName("pattern")]
        public string Pattern { get; set; }

        [JsonPropertyName("replace")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string Replace { get; set; }
    }
}
