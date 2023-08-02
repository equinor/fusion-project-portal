using System.Text.Json.Serialization;

namespace Equinor.ProjectExecutionPortal.FusionPortalApi.Apps.Models;

public class FusionPortalAppInformation
{
    [JsonPropertyName("key")]
    public string Key { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("version")]
    public string? Version { get; set; }

    [JsonPropertyName("shortName")]
    public string? ShortName { get; set; }

    [JsonPropertyName("description")]
    public string Description { get; set; }

    [JsonPropertyName("publishedDate")]
    public string? PublishedDate { get; set; }

    [JsonPropertyName("tags")]
    public string[] Tags { get; set; }

    [JsonPropertyName("hide")]
    public bool? Hide { get; set; }

    [JsonPropertyName("order")]
    public int Order { get; set; }

    [JsonPropertyName("type")]
    public string? Type { get; set; }

    [JsonPropertyName("accentColor")]
    public string? AccentColor { get; set; }

    [JsonPropertyName("icon")]
    public string? Icon { get; set; }

    [JsonPropertyName("categoryId")]
    public Guid? CategoryId { get; set; }

    [JsonPropertyName("category")]
    public FusionPortalAppInformationCategory? Category { get; set; }

    [JsonPropertyName("owners")]
    public Guid[] Owners { get; set; }

    [JsonPropertyName("admins")]
    public FusionPortalAppInformationAdmin[] Admins { get; set; }

    [JsonPropertyName("healthChecks")]
    public FusionPortalHealthCheck[] HealthChecks { get; set; }

    [JsonPropertyName("requiredRoles")]
    public FusionPortalRole[] RequiredRoles { get; set; }
}

public class FusionPortalAppInformationCategory
{
    [JsonPropertyName("id")]
    public Guid Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("color")]
    public string Color { get; set; }

    [JsonPropertyName("defaultIcon")]
    public string DefaultIcon { get; set; }
}

public class FusionPortalAppInformationAdmin
{
    [JsonPropertyName("azureUniqueId")]
    public Guid AzureUniqueId { get; set; }

    [JsonPropertyName("fusionRole")]
    public string FusionRole { get; set; }

    [JsonPropertyName("profile")]
    public FusionPortalProfile Profile { get; set; }
}
