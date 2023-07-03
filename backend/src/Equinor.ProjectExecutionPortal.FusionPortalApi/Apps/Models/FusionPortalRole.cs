﻿using System.Text.Json.Serialization;

namespace Equinor.ProjectExecutionPortal.FusionPortalApi.Apps.Models
{
    public class FusionPortalRole
    {
        [JsonPropertyName("fusionRole")]
        public string FusionRole { get; set; }

        [JsonPropertyName("azureAdGroupId")]
        public Guid AzureAdGroupId { get; set; }
    }
}
