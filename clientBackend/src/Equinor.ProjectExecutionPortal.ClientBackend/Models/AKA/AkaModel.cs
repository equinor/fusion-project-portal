using System.Text.Json.Serialization;

namespace Equinor.ProjectExecutionPortal.ClientBackend.Models.AKA
{
    public class AkaModel
    {
        [JsonPropertyName("rules")]
        public List<AkaRule> Rules { get; set; } = new();
    }
}
