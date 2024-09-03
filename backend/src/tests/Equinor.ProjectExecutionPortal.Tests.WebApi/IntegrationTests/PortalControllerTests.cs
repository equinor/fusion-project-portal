using System.Net;
using System.Text;
using Equinor.ProjectExecutionPortal.Tests.WebApi.Data;
using Equinor.ProjectExecutionPortal.Tests.WebApi.Setup;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.PortalApp;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.IntegrationTests
{
    [TestClass]
    public class PortalControllerTests : TestBase
    {
        private const string Route = "api/portals";

        [TestMethod]
        public async Task Get_Portals_AsAuthenticatedUser_ShouldReturnOk()
        {
            // Act
            var portals = await AssertGetAllPortals(UserType.Authenticated, HttpStatusCode.OK);

            // Assert
            Assert.IsNotNull(portals);
            Assert.IsTrue(portals.Count > 0);
        }

        [TestMethod]
        public async Task Get_Portals_AsAnonymous_ShouldReturnUnauthorized()
        {
            // Act
            var portals = await AssertGetAllPortals(UserType.Anonymous, HttpStatusCode.Unauthorized);

            // Assert
            Assert.IsNull(portals);
        }

        [TestMethod]
        public async Task Get_Portal_AsAuthenticatedUser_ShouldReturnOk()
        {
            // Arrange
            var portals = await AssertGetAllPortals(UserType.Authenticated, HttpStatusCode.OK);
            var portalToTest = portals?.FirstOrDefault();

            // Act & Assert
            await AssertGetPortal(portalToTest!.Id, UserType.Authenticated, HttpStatusCode.OK);
        }

        [TestMethod]
        public async Task Get_NonExistentPortal_AsAuthenticatedUser_ShouldReturnNotFound()
        {
            // Act & Assert
            var portal = await AssertGetPortal(Guid.NewGuid(), UserType.Authenticated, HttpStatusCode.NotFound);
        }

        [TestMethod]
        public async Task Get_Portal_AsAnonymous_ShouldReturnUnauthorized()
        {
            // Act
            var portal = await AssertGetPortal(Guid.NewGuid(), UserType.Anonymous, HttpStatusCode.Unauthorized);

            // Assert
            Assert.IsNull(portal);
        }

        [TestMethod]
        public async Task Get_PortalConfiguration_AsAuthenticatedUser_ShouldReturnOk()
        {
            // Arrange
            var portals = await AssertGetAllPortals(UserType.Authenticated, HttpStatusCode.OK);
            var portalToTest = portals!.First();

            // Act & Assert
            await AssertGetPortalConfiguration(portalToTest.Id, UserType.Authenticated, HttpStatusCode.OK);
        }

        [TestMethod]
        public async Task Get_NonExistentPortalConfiguration_AsAuthenticatedUser_ShouldReturnNotFound()
        {
            // Act & Assert
            await AssertGetPortalConfiguration(Guid.NewGuid(), UserType.Authenticated, HttpStatusCode.NotFound);
        }

        [TestMethod]
        public async Task Get_PortalConfiguration_AsAnonymous_ShouldReturnUnauthorized()
        {
            // Act
            var portal = await AssertGetPortalConfiguration(Guid.NewGuid(), UserType.Anonymous, HttpStatusCode.Unauthorized);

            // Assert
            Assert.IsNull(portal);
        }

        [TestMethod]
        public async Task Update_PortalConfiguration_AsAdministratorUser_ShouldReturnOk()
        {
            // Arrange
            var getAllBeforeUpdated = await AssertGetAllPortals(UserType.Administrator, HttpStatusCode.OK);
            var portalToTest = getAllBeforeUpdated!.First();
            var theOneToUpdate = await AssertGetPortalConfiguration(portalToTest.Id, UserType.Authenticated, HttpStatusCode.OK);

            var routerData = JsonSerializer.Serialize(
                new
                {
                    Router = new { Root = "" },
                    Routes = (List<object>)[new { Id = 1 }, new { Id = 2 },]
                }
            );

            var payload = new ApiUpdatePortalConfigurationRequest
            {
                Router = routerData
            };

            // Act
            var response = await UpdatePortalConfiguration(UserType.Administrator, payload, portalToTest.Id);

            // Assert
            var theOneAfterUpdate = await AssertGetPortalConfiguration(portalToTest.Id, UserType.Authenticated, HttpStatusCode.OK);

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.AreNotEqual(payload.Router, theOneToUpdate!.Router);
            Assert.AreEqual(payload.Router, theOneAfterUpdate!.Router);
        }

        [TestMethod]
        public async Task Update_PortalConfiguration_AsAuthenticatedUser_ShouldReturnForbidden()
        {
            // Arrange
            var payload = new ApiUpdatePortalConfigurationRequest();

            // Act
            var response = await UpdatePortalConfiguration(UserType.Authenticated, payload, Guid.NewGuid());

            // Assert
            Assert.AreEqual(HttpStatusCode.Forbidden, response.StatusCode);
        }

        [TestMethod]
        public async Task Update_PortalConfiguration_AsAnonymousUser_ShouldReturnUnauthorized()
        {
            // Arrange
            var payload = new ApiUpdatePortalConfigurationRequest();

            // Act
            var response = await UpdatePortalConfiguration(UserType.Anonymous, payload, Guid.NewGuid());

            // Assert
            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Ignore] // TODO: Need to perform clean up after each test
        [TestMethod]
        public async Task Get_OnlyGlobalAppsForPortal_WithoutContext_AsAuthenticatedUser_ShouldReturnOk()
        {
            // Arrange
            var portals = await AssertGetAllPortals(UserType.Authenticated, HttpStatusCode.OK);
            var portalToTest = portals?.FirstOrDefault();

            // Act
            var apps = await AssertGetAppsForPortal(portalToTest!.Id, null, null, UserType.Authenticated, HttpStatusCode.OK);

            // Assert
            Assert.IsNotNull(apps);
            Assert.AreEqual(apps.Count, 2);
        }

        [Ignore] // TODO: Need to perform clean up after each test
        [TestMethod] // Limitation: Invalid context not currently tested
        public async Task Get_BothGlobalAndContextAppsForPortal_WithValidContext_AsAuthenticatedUser_ShouldReturnOk()
        {
            // Arrange
            var portals = await AssertGetAllPortals(UserType.Authenticated, HttpStatusCode.OK);
            var portalToTest = portals?.FirstOrDefault();

            // Act
            var apps = await AssertGetAppsForPortal(portalToTest!.Id, FusionContextData.InitialSeedData.JcaContextExternalId, FusionContextData.InitialSeedData.ContextType, UserType.Authenticated, HttpStatusCode.OK);

            // Assert
            Assert.IsNotNull(apps);
            Assert.AreEqual(apps.Count, 3);
        }

        [Ignore]
        [TestMethod]
        public async Task Get_BothGlobalAndContextAppsForPortal_WithInvalidContext_AsAuthenticatedUser_ShouldReturn404()
        {
            // Arrange
            var portals = await AssertGetAllPortals(UserType.Authenticated, HttpStatusCode.OK);
            var portalToTest = portals?.FirstOrDefault();

            // Act
            var apps = await AssertGetAppsForPortal(portalToTest!.Id, FusionContextData.InitialSeedData.InvalidContextExternalId, FusionContextData.InitialSeedData.ContextType, UserType.Authenticated, HttpStatusCode.OK);

            // Assert
            // TODO Fusion 404 returned
        }

        [TestMethod]
        public async Task Get_AppsForNonExistentPortal_AsAuthenticatedUser_ShouldReturnNotFound()
        {
            // Act & Assert
            var response = await GetAppsForPortal(Guid.NewGuid(), null, null, UserType.Authenticated);

            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }

        [TestMethod]
        public async Task Get_AppsForPortal_WithoutContext_AsAnonymousUser_ShouldReturnUnauthorized()
        {
            // Act
            var apps = await AssertGetAppsForPortal(Guid.NewGuid(), null, null, UserType.Anonymous, HttpStatusCode.Unauthorized);

            // Assert
            Assert.IsNull(apps);
        }

        [TestMethod]
        public async Task Get_AppsForPortal_WithValidContext_AsAnonymousUser_ShouldReturnUnauthorized()
        {
            // Act
            var apps = await AssertGetAppsForPortal(Guid.NewGuid(), FusionContextData.InitialSeedData.JcaContextExternalId, FusionContextData.InitialSeedData.ContextType, UserType.Anonymous, HttpStatusCode.Unauthorized);

            // Assert
            Assert.IsNull(apps);
        }

        #region Helpers

        private static async Task<IList<ApiPortal>?> AssertGetAllPortals(UserType userType, HttpStatusCode expectedStatusCode)
        {
            // Act
            var response = await GetAllPortals(userType);
            var content = await response.Content.ReadAsStringAsync();
            var portals = JsonConvert.DeserializeObject<IList<ApiPortal>>(content);

            // Assert
            Assert.AreEqual(expectedStatusCode, response.StatusCode);

            if (response.StatusCode != HttpStatusCode.OK)
            {
                return portals;
            }

            Assert.IsNotNull(content);
            Assert.IsNotNull(portals);

            foreach (var portal in portals)
            {
                AssertHelpers.AssertPortalValues(portal);
                Assert.AreEqual(portal.Apps.Count, 0); // No relational data should be included in this request
            }

            return portals;
        }

        private static async Task<ApiPortal?> AssertGetPortal(Guid portalId, UserType userType, HttpStatusCode expectedStatusCode)
        {
            // Act
            var response = await GetPortal(portalId, userType);
            var content = await response.Content.ReadAsStringAsync();
            var portal = JsonConvert.DeserializeObject<ApiPortal>(content);

            // Assert
            Assert.AreEqual(expectedStatusCode, response.StatusCode);

            if (response.StatusCode != HttpStatusCode.OK)
            {
                return portal;
            }

            Assert.IsNotNull(content);
            Assert.IsNotNull(portal);
            AssertHelpers.AssertPortalValues(portal);
            AssertHelpers.AssertPortalConfigurationValues(portal.Configuration, acceptNullValues: true);
            Assert.AreEqual(portal.Apps.Count, 0); // No relational data should be included in this request

            return portal;
        }

        private static async Task<ApiPortalConfiguration?> AssertGetPortalConfiguration(Guid portalId, UserType userType, HttpStatusCode expectedStatusCode)
        {
            // Act
            var response = await GetPortalConfiguration(portalId, userType);
            var content = await response.Content.ReadAsStringAsync();
            var portalConfiguration = JsonConvert.DeserializeObject<ApiPortalConfiguration>(content);

            // Assert
            Assert.AreEqual(expectedStatusCode, response.StatusCode);

            if (response.StatusCode != HttpStatusCode.OK)
            {
                return portalConfiguration;
            }

            Assert.IsNotNull(content);
            Assert.IsNotNull(portalConfiguration);
            AssertHelpers.AssertPortalConfigurationValues(portalConfiguration, acceptNullValues: true);

            return portalConfiguration;
        }

        private static async Task<HttpResponseMessage> UpdatePortalConfiguration(UserType userType, ApiUpdatePortalConfigurationRequest updatedPortalConfiguration, Guid portalId)
        {
            var serializePayload = JsonConvert.SerializeObject(updatedPortalConfiguration);
            var content = new StringContent(serializePayload, Encoding.UTF8, "application/json");

            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.PutAsync($"{string.Format(Route)}/{portalId}/configuration", content);

            return response;
        }

        private static async Task<IList<ApiPortalApp>?> AssertGetAppsForPortal(Guid portalId, string? contextExternalId, string? contextType, UserType userType, HttpStatusCode expectedStatusCode)
        {
            // Act
            var response = await GetAppsForPortal(portalId, contextExternalId, contextType, userType);
            var content = await response.Content.ReadAsStringAsync();
            var apps = JsonConvert.DeserializeObject<IList<ApiPortalApp>>(content);

            // Assert
            Assert.AreEqual(expectedStatusCode, response.StatusCode);

            if (response.StatusCode != HttpStatusCode.OK)
            {
                return apps;
            }

            Assert.IsNotNull(content);
            Assert.IsNotNull(apps);

            foreach (var app in apps)
            {
                AssertHelpers.AssertPortalAppValues(app);
            }

            return apps;
        }

        private static async Task<HttpResponseMessage> GetAllPortals(UserType userType)
        {
            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.GetAsync($"{Route}");

            return response;
        }

        private static async Task<HttpResponseMessage> GetPortal(Guid portalId, UserType userType)
        {
            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.GetAsync($"{Route}/{portalId}");

            return response;
        }

        private static async Task<HttpResponseMessage> GetPortalConfiguration(Guid portalId, UserType userType)
        {
            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.GetAsync($"{Route}/{portalId}/configuration");

            return response;
        }

        private static async Task<HttpResponseMessage> GetAppsForPortal(Guid portalId, string? contextExternalId, string? contextType, UserType userType)
        {
            var route = contextExternalId != null ? $"{Route}/{portalId}/contexts/{contextExternalId}/apps" : $"{Route}/{portalId}/apps";
            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.GetAsync(route);

            return response;
        }

        #endregion Helpers
    }
}
