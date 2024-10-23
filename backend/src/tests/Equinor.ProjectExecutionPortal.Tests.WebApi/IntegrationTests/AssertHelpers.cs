using Equinor.ProjectExecutionPortal.WebApi.ViewModels.ContextType;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.PortalApp;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.IntegrationTests
{
    public class AssertHelpers
    {
        public static void AssertPortalValues(ApiPortal? portal)
        {
            if (portal == null)
            {
                Assert.Fail();
            }

            Assert.IsNotNull(portal.Id);
            Assert.IsNotNull(portal.Name);
            Assert.IsNotNull(portal.Icon);
            Assert.IsNotNull(portal.Key);
            Assert.IsNotNull(portal.ShortName);
            Assert.IsNotNull(portal.Subtext);
            Assert.IsNotNull(portal.Description);
            Assert.IsNotNull(portal);
        }

        public static void AssertPortalConfigurationValues(ApiPortalConfiguration? portalConfiguration, bool acceptNullValues)
        {
            if (portalConfiguration == null)
            {
                Assert.Fail();
            }

            if (!acceptNullValues)
            {
                Assert.IsNotNull(portalConfiguration.Router);
            }
        }

        public static void AssertPortalAppValues(ApiPortalApp? portalAll)
        {
            if (portalAll == null)
            {
                Assert.Fail();
            }

            Assert.IsNotNull(portalAll.AppKey);
        }

        public static void AssertOnboardedAppValues(ApiOnboardedApp? onboardedApp)
        {
            if (onboardedApp == null)
            {
                Assert.Fail();
            }

            Assert.IsNotNull(onboardedApp.AppKey);
        }

        public static void AssertContextTypeValues(ApiContextType? contextType)
        {
            if (contextType == null)
            {
                Assert.Fail();
            }

            Assert.IsNotNull(contextType.Type);
        }
    }
}
