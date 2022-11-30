using System.Net;
using Equinor.ProjectExecutionPortal.Tests.WebApi.Data;
using Equinor.ProjectExecutionPortal.Tests.WebApi.Setup;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurface;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceApp;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceAppGroup;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.IntegrationTests
{
    [TestClass]
    public class WorkSurfaceControllerTests : TestBase
    {
        private const string Route = "api/work-surfaces";

        [TestMethod]
        public async Task Get_WorkSurfaces_AsAuthenticatedUser_ShouldReturnOk()
        {
            // Act
            var workSurfaces = await AssertGetAllWorksurfaces(UserType.Authenticated, HttpStatusCode.OK);

            // Assert
            Assert.IsNotNull(workSurfaces);
            Assert.IsTrue(workSurfaces.Count > 0);

            foreach (var workSurface in workSurfaces)
            {
                Assert.AreEqual(workSurface.AppGroups.Count, 0); // No relational data should be included in this request
            }
        }

        [TestMethod]
        public async Task Get_WorkSurfaces_AsAnonymous_ShouldReturnUnauthorized()
        {
            // Act & Assert
            await AssertGetAllWorksurfaces(UserType.Anonymous, HttpStatusCode.Unauthorized);
        }

        [TestMethod]
        public async Task Get_WorkSurface_WithoutContext_AsAuthenticatedUser_ShouldReturnOkAndOnlyGlobalApps()
        {
            // Arrange
            var workSurfaces = await AssertGetAllWorksurfaces(UserType.Authenticated, HttpStatusCode.OK);
            var workSurfaceToTest = workSurfaces?.Single(x => x.Order == 1);

            // Act
            var workSurface = await AssertGetWorksurface(workSurfaceToTest!.Id, null, UserType.Authenticated, HttpStatusCode.OK);

            // Assert
            Assert.IsNotNull(workSurface);
            Assert.AreEqual(workSurface.AppGroups.Count, 3);

            // Verify that only global apps are returned
            var appGroupWithGlobalApps = workSurface.AppGroups.ElementAt(0);
            var appGroupWithContextApps = workSurface.AppGroups.ElementAt(1);
            var appGroupWithMixedApps = workSurface.AppGroups.ElementAt(2);

            Assert.AreEqual(appGroupWithGlobalApps.Apps.Count, 2);
            Assert.AreEqual(appGroupWithContextApps.Apps.Count, 0);
            Assert.AreEqual(appGroupWithMixedApps.Apps.Count, 1);

            foreach (var appGroup in workSurface.AppGroups)
            {
                AssertWorkSurfaceAppGroupValues(appGroup);

                foreach (var app in appGroup.Apps)
                {
                    AssertWorkSurfaceAppValues(app);
                }
            }
        }

        [TestMethod] // Limiation: Invalid context not currently tested
        public async Task Get_WorkSurface_WithValidContext_AsAuthenticatedUser_ShouldReturnOkAndBothGlobalAndContextApps()
        {
            // Arrange
            var workSurfaces = await AssertGetAllWorksurfaces(UserType.Authenticated, HttpStatusCode.OK);
            var workSurfaceToTest = workSurfaces?.Single(x => x.Order == 1);

            // Act
            var workSurface = await AssertGetWorksurface(workSurfaceToTest!.Id, FusionContextData.InitialSeedData.JcaExternalContextId, UserType.Authenticated, HttpStatusCode.OK);

            // Assert
            Assert.IsNotNull(workSurface);
            Assert.AreEqual(workSurface.AppGroups.Count, 3);

            // Verify that both global and context (for JCA) apps are returned
            var appGroupWithGlobalApps = workSurface.AppGroups.ElementAt(0);
            var appGroupWithContextApps = workSurface.AppGroups.ElementAt(1);
            var appGroupWithMixedApps = workSurface.AppGroups.ElementAt(2);

            Assert.AreEqual(appGroupWithGlobalApps.Apps.Count, 2);
            Assert.AreEqual(appGroupWithContextApps.Apps.Count, 2);
            Assert.AreEqual(appGroupWithMixedApps.Apps.Count, 1);

            foreach (var appGroup in workSurface.AppGroups)
            {
                AssertWorkSurfaceAppGroupValues(appGroup);

                foreach (var app in appGroup.Apps)
                {
                    AssertWorkSurfaceAppValues(app);
                }
            }
        }

        [TestMethod]
        public async Task Get_WorkSurface_AsAnonymous_ShouldReturnUnauthorized()
        {
            // Act
            var workSurface = await AssertGetWorksurface(new Guid(), null, UserType.Anonymous, HttpStatusCode.Unauthorized);

            // Assert
            Assert.IsNull(workSurface);
        }

        private static async Task<IList<ApiWorkSurface>?> AssertGetAllWorksurfaces(UserType userType, HttpStatusCode expectedStatusCode)
        {
            // Act
            var response = await GetAllWorksurfaces(userType);
            var content = await response.Content.ReadAsStringAsync();
            var workSurfaces = JsonConvert.DeserializeObject<IList<ApiWorkSurface>>(content);

            // Assert
            Assert.AreEqual(expectedStatusCode, response.StatusCode);

            if (response.StatusCode != HttpStatusCode.OK)
            {
                return null;
            }

            Assert.IsNotNull(content);
            Assert.IsNotNull(workSurfaces);

            foreach (var workSurface in workSurfaces)
            {
                AssertWorkSurfaceValues(workSurface);
            }

            return workSurfaces;
        }

        #region Helpers

        private static async Task<ApiWorkSurface?> AssertGetWorksurface(Guid workSurfaceId, string? contextExternalId, UserType userType, HttpStatusCode expectedStatusCode)
        {
            // Act
            var response = await GetWorksurface(workSurfaceId, contextExternalId, userType);
            var content = await response.Content.ReadAsStringAsync();
            var workSurface = JsonConvert.DeserializeObject<ApiWorkSurface>(content);

            // Assert
            Assert.AreEqual(expectedStatusCode, response.StatusCode);

            if (response.StatusCode != HttpStatusCode.OK)
            {
                return null;
            }

            Assert.IsNotNull(content);
            Assert.IsNotNull(workSurface);
            AssertWorkSurfaceValues(workSurface);

            return workSurface;
        }

        private static async Task<HttpResponseMessage> GetAllWorksurfaces(UserType userType)
        {
            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.GetAsync($"{Route}");

            return response;
        }

        private static async Task<HttpResponseMessage> GetWorksurface(Guid workSurfaceId, string? contextExternalId, UserType userType)
        {
            var route = contextExternalId != null ? $"{Route}/{workSurfaceId}/contexts/{contextExternalId}" : $"{Route}/{workSurfaceId}";
            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.GetAsync(route);

            return response;
        }

        private static void AssertWorkSurfaceValues(ApiWorkSurface? workSurface)
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

        private static void AssertWorkSurfaceAppGroupValues(ApiWorkSurfaceAppGroup? appGroup)
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

        private static void AssertWorkSurfaceAppValues(ApiWorkSurfaceApp? app)
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

        #endregion Helpers
    }
}
