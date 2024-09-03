﻿using System.Net;
using Equinor.ProjectExecutionPortal.Tests.WebApi.Data;
using Equinor.ProjectExecutionPortal.Tests.WebApi.Setup;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.PortalApp;
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
            var portalToTest = portals?.FirstOrDefault();

            // Act & Assert
            await AssertGetPortal(portalToTest!.Id, UserType.Authenticated, HttpStatusCode.OK);
        }

        [TestMethod]
        public async Task Get_NonExistentPortal_AsAuthenticatedUser_ShouldReturnNotFound()
        {
            // Act & Assert
            var response = await GetAppsForPortal(Guid.NewGuid(), null,  UserType.Authenticated);

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
            var portalToTest = portals?.FirstOrDefault();

            // Act
            var apps = await AssertGetAppsForPortal(portalToTest!.Id, null, UserType.Authenticated, HttpStatusCode.OK);

            // Assert
            Assert.IsNotNull(apps);
            Assert.AreEqual(apps.Count, 2);

        }

        [Ignore]// TODO: Need to perform clean up after each test
        [TestMethod] // Limitation: Invalid context not currently tested
        public async Task Get_BothGlobalAndContextAppsForPortal_WithValidContext_AsAuthenticatedUser_ShouldReturnOk()
        {
            // Arrange
            var portals = await AssertGetAllPortals(UserType.Authenticated, HttpStatusCode.OK);
            var portalToTest = portals?.SingleOrDefault(x => x.Key == PortalData.InitialSeedData.Portal2.Key);

            // Act
            var apps = await AssertGetAppsForPortal(portalToTest!.Id, FusionContextData.InitialSeedData.JcaContextId, UserType.Authenticated, HttpStatusCode.OK);

            // Assert
            Assert.IsNotNull(apps);
            Assert.AreEqual(apps.Count, 6);

        }

        [Ignore]
        [TestMethod]
        public async Task Get_BothGlobalAndContextAppsForPortal_WithInvalidContext_AsAuthenticatedUser_ShouldReturn404()
        {
            // Arrange
            var portals = await AssertGetAllPortals(UserType.Authenticated, HttpStatusCode.OK);
            var portalToTest = portals?.FirstOrDefault();

            // Act
            var apps = await AssertGetAppsForPortal(portalToTest!.Id, FusionContextData.InitialSeedData.InvalidContextId,UserType.Authenticated, HttpStatusCode.OK);

            // Assert
            // TODO Fusion 404 returned
        }

        [TestMethod]
        public async Task Get_AppsForNonExistentPortal_AsAuthenticatedUser_ShouldReturnNotFound()
        {
            // Act & Assert
            var response = await GetAppsForPortal(Guid.NewGuid(), null, UserType.Authenticated);

            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }

        [TestMethod]
        public async Task Get_AppsForPortal_WithoutContext_AsAnonymousUser_ShouldReturnUnauthorized()
        {
            // Act
            var apps = await AssertGetAppsForPortal(new Guid(), null, UserType.Anonymous, HttpStatusCode.Unauthorized);

            // Assert
            Assert.IsNull(apps);
        }

        [TestMethod]
        public async Task Get_AppsForPortal_WithValidContext_AsAnonymousUser_ShouldReturnUnauthorized()
        {
            // Act
            var apps = await AssertGetAppsForPortal(new Guid(), FusionContextData.InitialSeedData.JcaContextId, UserType.Anonymous, HttpStatusCode.Unauthorized);

            // Assert
            Assert.IsNull(apps);
        }

        [TestMethod]
        [Ignore] // TODO: Need to perform clean up after each test
        public async Task Delete_Portal_AsAdministrator_ShouldReturnOk()
        {
            // Arrange
            var portals = await AssertGetAllPortals(UserType.Administrator, HttpStatusCode.OK);
            var portalToDelete = portals?.SingleOrDefault(x => x.Key == PortalData.InitialSeedData.Portal1.Key);

            // Act
            var response = await DeletePortal(portalToDelete!.Id, UserType.Administrator);

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            // Verify the portal is actually deleted
            var deletedPortal = await AssertGetPortal(portalToDelete.Id, UserType.Authenticated, HttpStatusCode.NotFound);
            Assert.IsNull(deletedPortal);
        }

        [TestMethod]
        public async Task Delete_PortalWithApps_AsAuthenticatedUser_ShouldReturnForbidden()
        {
            // Arrange
            var portals = await AssertGetAllPortals(UserType.Authenticated, HttpStatusCode.OK);
            var portalToDelete = portals?.SingleOrDefault(x => x.Key == PortalData.InitialSeedData.Portal2.Key);

            // Ensure the portal has apps
            var apps = await AssertGetAppsForPortal(portalToDelete!.Id, FusionContextData.InitialSeedData.JcaContextId, UserType.Authenticated, HttpStatusCode.OK);
        
            Assert.IsNotNull(apps);
            Assert.IsTrue(apps.Count > 0);

            // Act
            var response = await DeletePortal(portalToDelete.Id, UserType.Administrator);

            // Assert
            Assert.AreEqual(HttpStatusCode.Forbidden, response.StatusCode);

            // Verify the portal is not deleted
            var deletedPortal = await AssertGetPortal(portalToDelete.Id, UserType.Authenticated, HttpStatusCode.OK);
            Assert.IsNotNull(deletedPortal);
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
                return null;
            }

            Assert.IsNotNull(content);
            Assert.IsNotNull(portal);
            AssertHelpers.AssertPortalValues(portal);
            Assert.AreEqual(portal.Apps.Count, 0); // No relational data should be included in this request

            return portal;
        }

        private static async Task<IList<ApiPortalApp>?> AssertGetAppsForPortal(Guid portalId, Guid? contextId, UserType userType, HttpStatusCode expectedStatusCode)
        {
            // Act
            var response = await GetAppsForPortal(portalId, contextId, userType);
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

        private static async Task<HttpResponseMessage> GetAppsForPortal(Guid portalId, Guid? contextId, UserType userType)
        {
            var route = contextId != null ? $"{Route}/{portalId}/contexts/{contextId}/apps" : $"{Route}/{portalId}/apps";
            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.GetAsync(route);

            return response;
        }

        private static async Task<HttpResponseMessage> DeletePortal(Guid portalId, UserType userType)
        {
            var route = $"{Route}/{portalId}";
            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.DeleteAsync(route);

            return response;
        }

        #endregion Helpers
    }
}
