namespace Equinor.ProjectExecutionPortal.ClientBackend.Services
{
    public class ClientBundleService : IClientBundleService
    {
        private readonly IWebHostEnvironment _environment;
        private const string PortalClientFileName = "index-*";

        public ClientBundleService(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        public static string GetClientBundleFolderPath(IWebHostEnvironment environment)
        {
            return Path.Combine(environment.ContentRootPath, "wwwroot", "ClientApp", environment.IsDevelopment() ? "development" : "production");
        }

        public string GetClientBundleFileName()
        {
            var bundleFilePath = GetClientBundleFilePath();

            return Path.GetFileName(bundleFilePath);
        }

        private string GetClientBundleFilePath()
        {
            var bundleFilePath = Directory
                .GetFiles(GetClientBundleFolderPath(_environment), PortalClientFileName)
                .FirstOrDefault();

            if (bundleFilePath == null)
            {
                throw new ApplicationException("Could not find the Portal Client bundle file");
            }

            return bundleFilePath;
        }
    }
}
