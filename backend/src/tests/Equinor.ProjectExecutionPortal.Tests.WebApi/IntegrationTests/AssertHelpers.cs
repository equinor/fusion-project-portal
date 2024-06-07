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
            Assert.IsNotNull(portal.IsDefault);
            Assert.IsNotNull(portal.Key);
            Assert.IsNotNull(portal.Order);
            Assert.IsNotNull(portal.ShortName);
            Assert.IsNotNull(portal.Subtext);
            Assert.IsNotNull(portal.Description);
            Assert.IsNotNull(portal);
        }

      

        public static void AssertPortalAppValues(ApiPortalApp? app)
        {
            if (app == null)
            {
                Assert.Fail();
            }

            Assert.IsNotNull(app.Key);
        }

        public static void AssertOnboardedAppValues(ApiOnboardedApp? app)
        {
            if (app == null)
            {
                Assert.Fail();
            }

            Assert.IsNotNull(app.AppKey);
            Assert.IsNotNull(app.IsLegacy);
        }
    }
}
