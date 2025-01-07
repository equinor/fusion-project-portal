using Equinor.ProjectExecutionPortal.WebApi.ViewModels;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.ContextType;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.PortalApp;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.IntegrationTests;

public class AssertHelpers
{
    public static void AssertAuditValues(ApiAudit? audit, bool assertModified)
    {
        Assert.IsNotNull(audit);
        Assert.IsNotNull(audit.CreatedAtUtc);
        Assert.IsNotNull(audit.CreatedByAzureOid);

        Assert.IsTrue(audit.CreatedAtUtc > DateTime.MinValue);
        Assert.IsTrue(Guid.Empty != audit.CreatedByAzureOid);

        if (assertModified)
        {
            Assert.IsNotNull(audit.ModifiedAtUtc);
            Assert.IsNotNull(audit.ModifiedByAzureOid);

            Assert.IsTrue(audit.ModifiedAtUtc > DateTime.MinValue);
            Assert.IsTrue(Guid.Empty != audit.ModifiedByAzureOid);
        }
    }

    public static void AssertPortalValues(ApiPortal? portal)
    {
        if (portal == null)
        {
            Assert.Fail();
        }

        Assert.IsNotNull(portal);
        Assert.IsNotNull(portal.Id);
        Assert.IsNotNull(portal.Name);
        Assert.IsNotNull(portal.Icon);
        Assert.IsNotNull(portal.Key);
        Assert.IsNotNull(portal.ShortName);
        Assert.IsNotNull(portal.Subtext);
        Assert.IsNotNull(portal.Description);
    }

    public static void AssertPortalConfigurationValues(ApiPortalConfiguration? portalConfiguration, bool acceptNullValues)
    {
        Assert.IsNotNull(portalConfiguration);

        if (!acceptNullValues)
        {
            Assert.IsNotNull(portalConfiguration.Router);
            Assert.IsNotNull(portalConfiguration.Extension);
            Assert.IsNotNull(portalConfiguration.Environment);
        }
    }

    public static void AssertPortalAppValues(ApiPortalApp? portalApp)
    {
        Assert.IsNotNull(portalApp);
        Assert.IsNotNull(portalApp.AppKey);
    }

    public static void AssertOnboardedAppValues(ApiOnboardedApp? onboardedApp)
    {
        Assert.IsNotNull(onboardedApp);
        Assert.IsNotNull(onboardedApp.AppKey);
        Assert.IsFalse(onboardedApp.DoesNotExistInFusion);
    }

    public static void AssertContextTypeValues(ApiContextType? contextType)
    {
        Assert.IsNotNull(contextType);
        Assert.IsNotNull(contextType.Type);
    }
}
