﻿using System.Net;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Tests.WebApi.Data;
using Equinor.ProjectExecutionPortal.Tests.WebApi.Setup;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurface;
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
        }

        [TestMethod]
        public async Task Get_WorkSurfaces_AsAnonymous_ShouldReturnUnauthorized()
        {
            // Act
            var workSurfaces = await AssertGetAllWorksurfaces(UserType.Anonymous, HttpStatusCode.Unauthorized);

            // Assert
            Assert.IsNull(workSurfaces);
        }

        [TestMethod]
        public async Task Get_WorkSurface_AsAuthenticatedUser_ShouldReturnOk()
        {
            // Arrange
            var workSurfaces = await AssertGetAllWorksurfaces(UserType.Authenticated, HttpStatusCode.OK);
            var workSurfaceToTest = workSurfaces?.Single(x => x.Order == 1);

            // Act & Assert
            await AssertGetWorksurface(workSurfaceToTest!.Id, UserType.Authenticated, HttpStatusCode.OK);
        }

        [TestMethod]
        public async Task Get_NonExistentWorkSurface_AsAuthenticatedUser_ShouldReturnNotFound()
        {
            // Act & Assert
            await Assert.ThrowsExceptionAsync<NotFoundException>(() => GetWorksurface(Guid.NewGuid(), UserType.Authenticated));
        }

        [TestMethod]
        public async Task Get_WorkSurface_AsAnonymous_ShouldReturnUnauthorized()
        {
            // Act
            var workSurface = await AssertGetWorksurface(Guid.NewGuid(), UserType.Anonymous, HttpStatusCode.Unauthorized);

            // Assert
            Assert.IsNull(workSurface);
        }

        //[TestMethod]
        //public async Task Get_AppsForWorkSurface_WithoutContext_AsAuthenticatedUser_ShouldReturnOkAndOnlyGlobalApps()
        //{
        //    // Arrange
        //    var workSurfaces = await AssertGetAllWorksurfaces(UserType.Authenticated, HttpStatusCode.OK);
        //    var workSurfaceToTest = workSurfaces?.Single(x => x.Order == 1);

        //    // Act
        //    var appGroups = await AssertGetAppsForWorksurface(workSurfaceToTest!.Id, null, UserType.Authenticated, HttpStatusCode.OK);

        //    // Assert
        //    Assert.IsNotNull(appGroups);
        //    Assert.AreEqual(appGroups.Count, 3);

        //    // Verify that only global apps are returned
        //    var appGroupWithGlobalApps = appGroups.ElementAt(0);
        //    var appGroupWithContextApps = appGroups.ElementAt(1);
        //    var appGroupWithMixedApps = appGroups.ElementAt(2);

        //    Assert.AreEqual(appGroupWithGlobalApps.Apps.Count, 2);
        //    Assert.AreEqual(appGroupWithContextApps.Apps.Count, 0);
        //    Assert.AreEqual(appGroupWithMixedApps.Apps.Count, 1);
        //}

        //[TestMethod] // Limitation: Invalid context not currently tested
        //public async Task Get_AppsForWorkSurface_WithValidContext_AsAuthenticatedUser_ShouldReturnOkAndBothGlobalAndContextApps()
        //{
        //    // Arrange
        //    var workSurfaces = await AssertGetAllWorksurfaces(UserType.Authenticated, HttpStatusCode.OK);
        //    var workSurfaceToTest = workSurfaces?.Single(x => x.Order == 1);

        //    // Act
        //    var appGroups = await AssertGetAppsForWorksurface(workSurfaceToTest!.Id, FusionContextData.InitialSeedData.JcaExternalContextId, UserType.Authenticated, HttpStatusCode.OK);

        //    // Assert
        //    Assert.IsNotNull(appGroups);
        //    Assert.AreEqual(appGroups.Count, 3);

        //    // Verify that both global and context (for JCA) apps are returned
        //    var appGroupWithGlobalApps = appGroups.ElementAt(0);
        //    var appGroupWithContextApps = appGroups.ElementAt(1);
        //    var appGroupWithMixedApps = appGroups.ElementAt(2);

        //    Assert.AreEqual(appGroupWithGlobalApps.Apps.Count, 2);
        //    Assert.AreEqual(appGroupWithContextApps.Apps.Count, 2);
        //    Assert.AreEqual(appGroupWithMixedApps.Apps.Count, 1);
        //}


        [TestMethod]
        public async Task Get_AppsForNonExistentWorkSurface_AsAuthenticatedUser_ShouldReturnNotFound()
        {
            // Act & Assert
            await Assert.ThrowsExceptionAsync<NotFoundException>(() => GetAppsForWorksurface(Guid.NewGuid(), null, UserType.Authenticated));
        }

        //[TestMethod]
        //public async Task Get_AppsForWorkSurface_WithoutContext_AsAnonymousUser_ShouldReturnUnauthorized()
        //{
        //    // Act
        //    var appGroups = await AssertGetAppsForWorksurface(new Guid(), null, UserType.Anonymous, HttpStatusCode.Unauthorized);

        //    // Assert
        //    Assert.IsNull(appGroups);
        //}

        //[TestMethod]
        //public async Task Get_AppsForWorkSurface_WithValidContext_AsAnonymousUser_ShouldReturnUnauthorized()
        //{
        //    // Act
        //    var appGroups = await AssertGetAppsForWorksurface(new Guid(), FusionContextData.InitialSeedData.JcaExternalContextId, UserType.Anonymous, HttpStatusCode.Unauthorized);

        //    // Assert
        //    Assert.IsNull(appGroups);
        //}

        #region Helpers

        public static async Task<IList<ApiWorkSurface>?> AssertGetAllWorksurfaces(UserType userType, HttpStatusCode expectedStatusCode)
        {
            // Act
            var response = await GetAllWorksurfaces(userType);
            var content = await response.Content.ReadAsStringAsync();
            var workSurfaces = JsonConvert.DeserializeObject<IList<ApiWorkSurface>>(content);

            // Assert
            Assert.AreEqual(expectedStatusCode, response.StatusCode);

            if (response.StatusCode != HttpStatusCode.OK)
            {
                return workSurfaces;
            }

            Assert.IsNotNull(content);
            Assert.IsNotNull(workSurfaces);

            foreach (var workSurface in workSurfaces)
            {
                AssertHelpers.AssertWorkSurfaceValues(workSurface);
                Assert.AreEqual(workSurface.Apps.Count, 0); // No relational data should be included in this request
            }

            return workSurfaces;
        }

        private static async Task<ApiWorkSurface?> AssertGetWorksurface(Guid workSurfaceId, UserType userType, HttpStatusCode expectedStatusCode)
        {
            // Act
            var response = await GetWorksurface(workSurfaceId, userType);
            var content = await response.Content.ReadAsStringAsync();
            var workSurface = JsonConvert.DeserializeObject<ApiWorkSurface>(content);

            // Assert
            Assert.AreEqual(expectedStatusCode, response.StatusCode);

            if (response.StatusCode != HttpStatusCode.OK)
            {
                return workSurface;
            }

            Assert.IsNotNull(content);
            Assert.IsNotNull(workSurface);
            AssertHelpers.AssertWorkSurfaceValues(workSurface);
            Assert.AreEqual(workSurface.Apps.Count, 0); // No relational data should be included in this request

            return workSurface;
        }

        //private static async Task<IList<ApiAppGroup>?> AssertGetAppsForWorksurface(Guid workSurfaceId, string? externalContextId, UserType userType, HttpStatusCode expectedStatusCode)
        //{
        //    // Act
        //    var response = await GetAppsForWorksurface(workSurfaceId, externalContextId, userType);
        //    var content = await response.Content.ReadAsStringAsync();
        //    var appGroups = JsonConvert.DeserializeObject<IList<ApiAppGroup>>(content);

        //    // Assert
        //    Assert.AreEqual(expectedStatusCode, response.StatusCode);

        //    if (response.StatusCode != HttpStatusCode.OK)
        //    {
        //        return appGroups;
        //    }

        //    Assert.IsNotNull(content);
        //    Assert.IsNotNull(appGroups);

        //    foreach (var appGroup in appGroups)
        //    {
        //        AssertHelpers.AssertWorkSurfaceAppGroupValues(appGroup);

        //        foreach (var app in appGroup.Apps)
        //        {
        //            AssertHelpers.AssertWorkSurfaceAppValues(app);
        //        }
        //    }

        //    return appGroups;
        //}

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

        private static async Task<HttpResponseMessage> GetAppsForWorksurface(Guid workSurfaceId, string? contextExternalId, UserType userType)
        {
            var route = contextExternalId != null ? $"{Route}/{workSurfaceId}/contexts/{contextExternalId}/apps" : $"{Route}/{workSurfaceId}/apps";
            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.GetAsync(route);

            return response;
        }

        #endregion Helpers
    }
}
