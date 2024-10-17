using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Data
{
    internal class PortalConfigurationData
    {
        public class InitialDbSeedData
        {
            public static PortalConfiguration GenericPortalConfiguration = new(
                "routerConfig",
                "extensionConfig",
                "environmentConfig"
            );
        }
    }
}
