using System.Net;
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
            var response = await GetAllWorksurfaces(UserType.Authenticated);
            var content = await response.Content.ReadAsStringAsync();
            var workSurfaces = JsonConvert.DeserializeObject<IList<ApiWorkSurface>>(content);

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.IsNotNull(content);
            Assert.IsNotNull(workSurfaces);
            Assert.IsTrue(workSurfaces.Count > 0);

            foreach (var workSurface in workSurfaces)
            {
                AssertWorkSurfaceValues(workSurface);
                Assert.AreEqual(workSurface.AppGroups.Count, 0); // No relational data should be included in this request
            }
        }

        [TestMethod]
        public async Task Get_WorkSurfaces_AsAnonymous_ShouldReturnUnauthorized()
        {
            // Act
            var response = await GetAllWorksurfaces(UserType.Anonymous);

            // Assert
            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [TestMethod]
        public async Task Get_WorkSurface_AsAuthenticatedUser_ShouldReturnOk()
        {
            // Arrange
            var workSurfacesResponse = await GetAllWorksurfaces(UserType.Authenticated);
            var workSurfacesContent = await workSurfacesResponse.Content.ReadAsStringAsync();
            var workSurfaces = JsonConvert.DeserializeObject<IList<ApiWorkSurface>>(workSurfacesContent);
            var workSurfaceToTest = workSurfaces?.Single(x => x.Order == 1);

            // Act
            var response = await GetWorksurface(workSurfaceToTest!.Id, UserType.Authenticated);
            var content = await response.Content.ReadAsStringAsync();
            var workSurface = JsonConvert.DeserializeObject<ApiWorkSurface>(content);

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.IsNotNull(content);
            Assert.IsNotNull(workSurface);

            AssertWorkSurfaceValues(workSurface);
            Assert.AreEqual(workSurface.AppGroups.Count, 4);

            // Relational data
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
            var response = await GetWorksurface(new Guid(), UserType.Anonymous);
            var content = await response.Content.ReadAsStringAsync();
            var workSurface = JsonConvert.DeserializeObject<ApiWorkSurface>(content);

            // Assert
            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
            Assert.IsNull(workSurface);
        }

        private static async Task<HttpResponseMessage> GetAllWorksurfaces(UserType userType)
        {
            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.GetAsync($"{Route}");

            return response;
        }

        private static async Task<HttpResponseMessage> GetWorksurface(Guid workSurfaceId, UserType userType)
        {
            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.GetAsync($"{Route}/{workSurfaceId}");

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
    }
}
