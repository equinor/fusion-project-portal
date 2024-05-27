using System.Net;
using Equinor.ProjectExecutionPortal.Tests.WebApi.Data;
using Equinor.ProjectExecutionPortal.Tests.WebApi.Setup;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;

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
            var portalToTest = portals?.Single(x => x.Order == 1);

            // Act & Assert
            await AssertGetPortal(portalToTest!.Id, UserType.Authenticated, HttpStatusCode.OK);
        }

        [TestMethod]
        public async Task Get_NonExistentPortal_AsAuthenticatedUser_ShouldReturnNotFound()
        {
            // Act & Assert
            var response = await GetAppsForPortal(Guid.NewGuid(), null, null, UserType.Authenticated);

            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }

        [TestMethod]
        public async Task Get_Portal_AsAnonymous_ShouldReturnUnauthorized()
        {
            // Act
            var portal = await AssertGetPortal(Guid.NewGuid(), UserType.Anonymous, HttpStatusCode.Unauthorized);

            // Assert
            Assert.IsNull(portal);
        }

        [Ignore] // TODO: Need to perform clean up after each test
        [TestMethod]
        public async Task Get_OnlyGlobalAppsForPortal_WithoutContext_AsAuthenticatedUser_ShouldReturnOk()
        {
            // Arrange
            var portals = await AssertGetAllPortals(UserType.Authenticated, HttpStatusCode.OK);
            var portalToTest = portals?.Single(x => x.Order == 1);

            // Act
            var appGroups = await AssertGetAppsForPortal(portalToTest!.Id, null, null, UserType.Authenticated, HttpStatusCode.OK);

            // Assert
            Assert.IsNotNull(appGroups);
            Assert.AreEqual(appGroups.Count, 2);

            // Verify that only global apps are returned. No app empty app groups
            var appGroupWithGlobalApps = appGroups.ElementAt(0);
            var appGroupWithMixedApps = appGroups.ElementAt(1);

            Assert.AreEqual(appGroupWithGlobalApps.Apps.Count, 2);
            Assert.AreEqual(appGroupWithMixedApps.Apps.Count, 1);
        }

        [Ignore] // TODO: Need to perform clean up after each test
        [TestMethod] // Limitation: Invalid context not currently tested
        public async Task Get_BothGlobalAndContextAppsForPortal_WithValidContext_AsAuthenticatedUser_ShouldReturnOk()
        {
            // Arrange
            var portals = await AssertGetAllPortals(UserType.Authenticated, HttpStatusCode.OK);
            var portalToTest = portals?.Single(x => x.Order == 1);

            // Act
            var appGroups = await AssertGetAppsForPortal(portalToTest!.Id, FusionContextData.InitialSeedData.JcaContextExternalId, FusionContextData.InitialSeedData.ContextType,UserType.Authenticated, HttpStatusCode.OK);

            // Assert
            Assert.IsNotNull(appGroups);
            Assert.AreEqual(appGroups.Count, 3);

            // Verify that both global and context (for JCA) apps are returned
            var appGroupWithGlobalApps = appGroups.ElementAt(0);
            var appGroupWithContextApps = appGroups.ElementAt(1);
            var appGroupWithMixedApps = appGroups.ElementAt(2);

            Assert.AreEqual(appGroupWithGlobalApps.Apps.Count, 2);
            Assert.AreEqual(appGroupWithContextApps.Apps.Count, 2);
            Assert.AreEqual(appGroupWithMixedApps.Apps.Count, 1);
        }

        [Ignore]
        [TestMethod]
        public async Task Get_BothGlobalAndContextAppsForPortal_WithInvalidContext_AsAuthenticatedUser_ShouldReturn404()
        {
            // Arrange
            var portals = await AssertGetAllPortals(UserType.Authenticated, HttpStatusCode.OK);
            var portalToTest = portals?.Single(x => x.Order == 1);

            // Act
            var appGroups = await AssertGetAppsForPortal(portalToTest!.Id, FusionContextData.InitialSeedData.InvalidContextExternalId, FusionContextData.InitialSeedData.ContextType,UserType.Authenticated, HttpStatusCode.OK);

            // Assert
            // TODO Fusion 404 returned
        }

        [TestMethod]
        public async Task Get_AppsForNonExistentPortal_AsAuthenticatedUser_ShouldReturnNotFound()
        {
            // Act & Assert
            var response = await GetAppsForPortal(Guid.NewGuid(), null,null, UserType.Authenticated);

            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }

        [TestMethod]
        public async Task Get_AppsForPortal_WithoutContext_AsAnonymousUser_ShouldReturnUnauthorized()
        {
            // Act
            var appGroups = await AssertGetAppsForPortal(new Guid(), null, null, UserType.Anonymous, HttpStatusCode.Unauthorized);

            // Assert
            Assert.IsNull(appGroups);
        }

        [TestMethod]
        public async Task Get_AppsForPortal_WithValidContext_AsAnonymousUser_ShouldReturnUnauthorized()
        {
            // Act
            var appGroups = await AssertGetAppsForPortal(new Guid(), FusionContextData.InitialSeedData.JcaContextExternalId, FusionContextData.InitialSeedData.ContextType, UserType.Anonymous, HttpStatusCode.Unauthorized);

            // Assert
            Assert.IsNull(appGroups);
        }

        #region Helpers

        public static async Task<IList<ApiPortal>?> AssertGetAllPortals(UserType userType, HttpStatusCode expectedStatusCode)
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
            Assert.AreEqual(portal.Apps.Count, 0); // No relational data should be included in this request

            return portal;
        }

        private static async Task<IList<ApiPortalAppGroupWithApps>?> AssertGetAppsForPortal(Guid portalId, string? contextExternalId, string? contextType, UserType userType, HttpStatusCode expectedStatusCode)
        {
            // Act
            var response = await GetAppsForPortal(portalId, contextExternalId, contextType, userType);
            var content = await response.Content.ReadAsStringAsync();
            var appGroups = JsonConvert.DeserializeObject<IList<ApiPortalAppGroupWithApps>>(content);

            // Assert
            Assert.AreEqual(expectedStatusCode, response.StatusCode);

            if (response.StatusCode != HttpStatusCode.OK)
            {
                return appGroups;
            }

            Assert.IsNotNull(content);
            Assert.IsNotNull(appGroups);

            foreach (var appGroup in appGroups)
            {
                AssertHelpers.AssertPortalAppGroupValues(appGroup);

                foreach (var app in appGroup.Apps)
                {
                    AssertHelpers.AssertPortalAppValues(app);
                }
            }

            return appGroups;
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

        private static async Task<HttpResponseMessage> GetAppsForPortal(Guid portalId, string? contextExternalId, string? contextType, UserType userType)
        {
            var route = contextExternalId != null ? $"{Route}/{portalId}/contexts/{contextExternalId}/type/{contextType}/app-groups" : $"{Route}/{portalId}/app-groups";
            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.GetAsync(route);

            return response;
        }

        #endregion Helpers
    }
}
