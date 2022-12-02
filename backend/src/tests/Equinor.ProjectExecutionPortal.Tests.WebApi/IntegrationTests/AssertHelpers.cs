using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurface;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceApp;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceAppGroup;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.IntegrationTests
{
    public class AssertHelpers
    {
        public static void AssertWorkSurfaceValues(ApiWorkSurface? workSurface)
        {
            if (workSurface == null)
            {
                Assert.Fail();
            }

            Assert.IsNotNull(workSurface.Id);
            Assert.IsNotNull(workSurface.Name);
            Assert.IsNotNull(workSurface.Icon);
            Assert.IsNotNull(workSurface.IsDefault);
            Assert.IsNotNull(workSurface.Key);
            Assert.IsNotNull(workSurface.Order);
            Assert.IsNotNull(workSurface.ShortName);
            Assert.IsNotNull(workSurface.Subtext);
        }

        public static void AssertWorkSurfaceAppGroupValues(ApiWorkSurfaceAppGroup? appGroup)
        {
            if (appGroup == null)
            {
                Assert.Fail();
            }

            Assert.IsNotNull(appGroup.Id);
            Assert.IsNotNull(appGroup.Name);
            Assert.IsNotNull(appGroup.Order);
            Assert.IsNotNull(appGroup.AccentColor);
        }

        public static void AssertWorkSurfaceAppValues(ApiWorkSurfaceApp? app)
        {
            if (app == null)
            {
                Assert.Fail();
            }

            Assert.IsNotNull(app.AppKey);
            Assert.IsNotNull(app.Name);
            Assert.IsNotNull(app.Description);
            Assert.IsNotNull(app.Order);
        }
    }
}
