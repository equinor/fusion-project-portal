using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Data
{
    internal static class PortalConfigurationData
    {
        public static class InitialDbSeedData
        {
            public static readonly PortalConfiguration GenericPortalConfiguration = new(
                "routerConfig",
                "extensionConfig",
                "environmentConfig"
            );
        }
    }
}
