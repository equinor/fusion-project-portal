using System.Text.Json.Serialization;

namespace Equinor.ProjectExecutionPortal.Domain.AKA
{
    public class AkaModel
    {
        [JsonPropertyName("rules")]
        public List<AkaRule> Rules { get; set; } = new();
    }
}
