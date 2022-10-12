namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels
{
    public class PortalIndexViewModel
    {
        public PortalIndexViewModel(
            string environmentName,
            string pullRequestNumber,
            bool isProduction,
            string clientId,
            string endpointConfig,
            string domain,
            string? upn,
            string instrumentationKey,
            string fusionPortalClientId,
            string agGridLicenseKey)
        {
            EnvironmentName = environmentName;
            PullRequestNumber = pullRequestNumber;
            IsProduction = isProduction;
            ClientId = clientId;
            EndpointConfig = endpointConfig;
            Domain = domain;
            Upn = upn;
            InstrumentationKey = instrumentationKey;
            FusionPortalClientId = fusionPortalClientId;
            AgGridLicenseKey = agGridLicenseKey;
        }

        public string EnvironmentName { get; internal set; }
        public string PullRequestNumber { get; internal set; }
        public bool IsProduction { get; internal set; }
        public string ClientId { get; internal set; }
        public string EndpointConfig { get; internal set; }
        public string Domain { get; internal set; }
        public string? Upn { get; internal set; }
        public string InstrumentationKey { get; internal set; }
        public string FusionPortalClientId { get; internal set; }
        public string AgGridLicenseKey { get; internal set; }
    }
}
