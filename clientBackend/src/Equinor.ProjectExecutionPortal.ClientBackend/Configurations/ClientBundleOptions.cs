namespace Equinor.ProjectExecutionPortal.ClientBackend.Configurations
{
    public class ClientBundleOptions
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public ClientBundleMsalOptions? Msal { get; set; }
        public ClientBundleAgGridOptions? AgGrid { get; set; }
    }

    public class ClientBundleMsalOptions
    {
        public string? TenantId { get; set; }
        public string? ClientId { get; set; }
        public string? RedirectUri { get; set; }
    }

    public class ClientBundleAgGridOptions
    {
        public string? LicenseKey { get; set; }
    }

}
