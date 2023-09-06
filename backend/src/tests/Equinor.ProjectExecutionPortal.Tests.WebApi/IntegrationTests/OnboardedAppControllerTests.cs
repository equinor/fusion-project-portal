﻿using System.Net;
using System.Text;
using Equinor.ProjectExecutionPortal.Tests.WebApi.Data;
using Equinor.ProjectExecutionPortal.Tests.WebApi.Setup;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.IntegrationTests
{
    [TestClass]
    public class OnboardedAppControllerTests : TestBase
    {
        private const string Route = "api/onboarded-apps";

        [TestMethod]
        public async Task Get_OnboardedApps_AsAuthenticatedUser_ShouldReturnOk()
        {
            // Act
            var onboardedApps = await AssertGetAllOnboardedApps(UserType.Authenticated, HttpStatusCode.OK);

            // Assert
            Assert.IsNotNull(onboardedApps);
            Assert.IsTrue(onboardedApps.Count > 0);

            AssertHelpers.AssertOnboardedAppValues(onboardedApps.FirstOrDefault());
        }

        [TestMethod]
        public async Task Get_OnboardedApps_AsAdministratorUser_ShouldReturnOk()
        {
            // Act
            var onboardedApps = await AssertGetAllOnboardedApps(UserType.Administrator, HttpStatusCode.OK);

            // Assert
            Assert.IsNotNull(onboardedApps);
            Assert.IsTrue(onboardedApps.Count > 0);
            AssertHelpers.AssertOnboardedAppValues(onboardedApps.FirstOrDefault());
        }

        [TestMethod]
        public async Task Get_OnboardedApps_AsAnonymous_ShouldReturnUnauthorized()
        {
            // Act
            var onboardedApps = await AssertGetAllOnboardedApps(UserType.Anonymous, HttpStatusCode.Unauthorized);

            // Assert
            Assert.IsNull(onboardedApps);
        }

        [TestMethod]
        public async Task Get_OnboardedApp_AsAuthenticatedUser_ShouldReturnOk()
        {
            // Act
            var onboardedApp = await AssertGetOnboardedApp(OnboardedAppsData.InitialSeedData.MeetingsApp.AppKey, UserType.Authenticated, HttpStatusCode.OK);

            // Assert
            Assert.IsNotNull(onboardedApp);

            AssertHelpers.AssertOnboardedAppValues(onboardedApp);
        }

        [TestMethod]
        public async Task Get_OnboardedApp_AsAdministratorUser_ShouldReturnOk()
        {
            // Act
            var onboardedApp = await AssertGetOnboardedApp(OnboardedAppsData.InitialSeedData.MeetingsApp.AppKey, UserType.Administrator, HttpStatusCode.OK);

            // Assert
            Assert.IsNotNull(onboardedApp);

            AssertHelpers.AssertOnboardedAppValues(onboardedApp);
        }

        [TestMethod]
        public async Task Get_OnboardedApp_AsAnonymous_ShouldReturnUnauthorized()
        {
            // Act
            var onboardedApp = await AssertGetOnboardedApp(OnboardedAppsData.InitialSeedData.MeetingsApp.AppKey, UserType.Anonymous, HttpStatusCode.Unauthorized);

            // Assert
            Assert.IsNull(onboardedApp);
        }

        [TestMethod]
        public async Task Add_Valid_OnboardedApp_AsAdministratorUser_ShouldReturnOk()
        {
            // Arrange
            var getAllAppGroups = await AppGroupControllerTests.AssertGetAllAppGroups(UserType.Administrator, HttpStatusCode.OK);
            var getAllBeforeAdded = await AssertGetAllOnboardedApps(UserType.Administrator, HttpStatusCode.OK);
            var totalCountBeforeAdded = getAllBeforeAdded?.Count;

            var payload = new ApiOnboardAppRequest
            {
                AppKey = "test-app",
                IsLegacy = false,
                AppGroupId = getAllAppGroups!.First().Id
            };

            // Act
            var response = await AddOnboardedApp(UserType.Administrator, payload);

            // Assert
            var getAllAfterAdded = await AssertGetAllOnboardedApps(UserType.Administrator, HttpStatusCode.OK);
            var totalCountAfterAdded = getAllAfterAdded?.Count;

            Assert.IsNotNull(totalCountBeforeAdded);
            Assert.IsNotNull(totalCountAfterAdded);
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.AreEqual(totalCountBeforeAdded + 1, totalCountAfterAdded);
        }

        [TestMethod]
        public async Task Add_Valid_OnboardedApp_AsAuthenticatedUser_ShouldReturnForbidden()
        {
            // Arrange
            var payload = new ApiOnboardAppRequest
            {
                AppKey = "test-app",
                IsLegacy = false,
                AppGroupId = Guid.NewGuid()
            };

            // Act
            var response = await AddOnboardedApp(UserType.Authenticated, payload);

            // Assert
            Assert.AreEqual(HttpStatusCode.Forbidden, response.StatusCode);
        }

        [TestMethod]
        public async Task Add_Valid_OnboardedApp_AsAnonymousUser_ShouldReturnUnauthorized()
        {
            // Arrange
            var payload = new ApiOnboardAppRequest
            {
                AppKey = "test-app",
                IsLegacy = false,
                AppGroupId = Guid.NewGuid()
            };

            // Act
            var response = await AddOnboardedApp(UserType.Anonymous, payload);

            // Assert
            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Ignore] // TODO: Mock service must accept dynamic values
        [TestMethod]
        public async Task Add_Invalid_OnboardedApp_AsAdministratorUser_ShouldThrowExeption()
        {
            // Arrange
            var payload = new ApiOnboardAppRequest
            {
                AppKey = "i-do-not-exist-in-fusion",
                IsLegacy = false
            };

            // Act
            var response = await AddOnboardedApp(UserType.Administrator, payload);

            // Assert
            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [TestMethod]
        public async Task Add_Duplicate_OnboardedApp_AsAdministratorUser_ShouldThrowException()
        {
            // Arrange
            var payload = new ApiOnboardAppRequest
            {
                AppKey = OnboardedAppsData.InitialSeedData.OrgChartApp.AppKey,
                IsLegacy = false
            };

            var addDuplicateResponse = await AddOnboardedApp(UserType.Administrator, payload);

            // Act & Assert
            Assert.AreEqual(HttpStatusCode.BadRequest, addDuplicateResponse.StatusCode);
        }

        [TestMethod]
        public async Task Update_OnboardedApp_AsAdministratorUser_ShouldReturnOk()
        {
            // Arrange
            var getAllBeforeUpdated = await AssertGetAllOnboardedApps(UserType.Administrator, HttpStatusCode.OK);
            var theOneToUpdate = getAllBeforeUpdated!.First();
            var getAllAppGroups = await AppGroupControllerTests.AssertGetAllAppGroups(UserType.Administrator, HttpStatusCode.OK);
            var theNewAppGroup = getAllAppGroups!.First(x => x.Id != theOneToUpdate.AppGroup.Id);

            var payload = new ApiUpdateOnboardedAppRequest
            {
                AppGroupId = theNewAppGroup.Id,
                IsLegacy = false
            };

            // Act
            var response = await UpdateOnboardedApp(UserType.Administrator, payload, theOneToUpdate.AppKey);

            // Assert
            var getAllAfterAdded = await AssertGetAllOnboardedApps(UserType.Administrator, HttpStatusCode.OK);
            var theOneAfterUpdate = getAllAfterAdded!.First(x => x.Id == theOneToUpdate.Id);

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.AreEqual(theOneToUpdate.AppKey, theOneAfterUpdate.AppKey);
            Assert.AreEqual(theOneToUpdate.IsLegacy, theOneAfterUpdate.IsLegacy);
            Assert.AreEqual(theOneAfterUpdate.AppGroup.Id, theNewAppGroup.Id);
            Assert.AreNotEqual(theOneToUpdate.AppGroup.Id, theOneAfterUpdate.AppGroup.Id);
        }

        [TestMethod]
        public async Task Update_OnboardedApp_AsAuthenticatedUser_ShouldReturnForbidden()
        {
            // Arrange
            var payload = new ApiUpdateOnboardedAppRequest
            {
                AppGroupId = Guid.NewGuid()
            };

            // Act
            var response = await UpdateOnboardedApp(UserType.Authenticated, payload, "some-app-key");

            // Assert
            Assert.AreEqual(HttpStatusCode.Forbidden, response.StatusCode);
        }

        [TestMethod]
        public async Task Update_OnboardedApp_AsAnonymousUser_ShouldReturnUnauthorized()
        {
            // Arrange
            var payload = new ApiUpdateOnboardedAppRequest
            {
                AppGroupId = Guid.NewGuid()
            };

            // Act
            var response = await UpdateOnboardedApp(UserType.Anonymous, payload, "some-app-key");

            // Assert
            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [TestMethod]
        public async Task Remove_OnboardedApp_AsAdministratorUser_ShouldReturnOk()
        {
            // Arrange
            var getAllAppGroups = await AppGroupControllerTests.AssertGetAllAppGroups(UserType.Administrator, HttpStatusCode.OK);

            var payload = new ApiOnboardAppRequest
            {
                AppKey = "app-to-be-removed",
                IsLegacy = false,
                AppGroupId = getAllAppGroups!.First().Id
            };

            // Act
            await AddOnboardedApp(UserType.Administrator, payload);

            var getAllAfterAdded = await AssertGetAllOnboardedApps(UserType.Administrator, HttpStatusCode.OK);
            var totalCountAfterAdded = getAllAfterAdded?.Count;

            var removeResponse = await RemoveOnboardedApp(UserType.Administrator, payload.AppKey);

            var getAllAfterRemoval = await AssertGetAllOnboardedApps(UserType.Administrator, HttpStatusCode.OK);
            var totalCountAfterRemoval = getAllAfterRemoval?.Count;

            // Assert
            Assert.IsNotNull(totalCountAfterAdded);
            Assert.IsNotNull(totalCountAfterRemoval);
            Assert.AreEqual(HttpStatusCode.OK, removeResponse.StatusCode);
            Assert.AreEqual(totalCountAfterAdded - 1, totalCountAfterRemoval);
        }

        [TestMethod]
        public async Task Remove_OnboardedApp_AsAuthenticatedUser_ShouldReturnForbidden()
        {
            // Arrange
            var existingOnboardedAppKey = OnboardedAppsData.InitialSeedData.OrgChartApp.AppKey;

            // Act
            var removeResponse = await RemoveOnboardedApp(UserType.Authenticated, existingOnboardedAppKey);

            // Assert
            Assert.AreEqual(HttpStatusCode.Forbidden, removeResponse.StatusCode);
        }

        [TestMethod]
        public async Task Remove_OnboardedApp_AsAnonymousUser_ShouldReturnUnauthorized()
        {
            // Arrange
            var existingOnboardedAppKey = OnboardedAppsData.InitialSeedData.OrgChartApp.AppKey;

            // Act
            var removeResponse = await RemoveOnboardedApp(UserType.Anonymous, existingOnboardedAppKey);

            // Assert
            Assert.AreEqual(HttpStatusCode.Unauthorized, removeResponse.StatusCode);
        }

        #region Helpers

        private static async Task<IList<ApiOnboardedApp>?> AssertGetAllOnboardedApps(UserType userType, HttpStatusCode expectedStatusCode)
        {
            // Act
            var response = await GetAllOnboardedApps(userType);
            var content = await response.Content.ReadAsStringAsync();
            var onboardedApps = JsonConvert.DeserializeObject<IList<ApiOnboardedApp>>(content);

            // Assert
            Assert.AreEqual(expectedStatusCode, response.StatusCode);

            if (response.StatusCode != HttpStatusCode.OK)
            {
                return onboardedApps;
            }

            Assert.IsNotNull(content);
            Assert.IsNotNull(onboardedApps);

            foreach (var app in onboardedApps)
            {
                AssertHelpers.AssertOnboardedAppValues(app);
            }

            return onboardedApps;
        }

        private static async Task<ApiOnboardedApp?> AssertGetOnboardedApp(string appKey, UserType userType, HttpStatusCode expectedStatusCode)
        {
            // Act
            var response = await GetOnboardedApp(userType, appKey);
            var content = await response.Content.ReadAsStringAsync();
            var onboardedApp = JsonConvert.DeserializeObject<ApiOnboardedApp>(content);

            // Assert
            Assert.AreEqual(expectedStatusCode, response.StatusCode);

            if (response.StatusCode != HttpStatusCode.OK)
            {
                return onboardedApp;
            }

            Assert.IsNotNull(content);
            Assert.IsNotNull(onboardedApp);

            AssertHelpers.AssertOnboardedAppValues(onboardedApp);

            return onboardedApp;
        }

        private static async Task<HttpResponseMessage> GetAllOnboardedApps(UserType userType)
        {
            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.GetAsync($"{Route}");

            return response;
        }

        private static async Task<HttpResponseMessage> GetOnboardedApp(UserType userType, string appKey)
        {
            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.GetAsync($"{Route}/{appKey}");

            return response;
        }

        private static async Task<HttpResponseMessage> AddOnboardedApp(UserType userType, ApiOnboardAppRequest onboardApp)
        {
            var serializePayload = JsonConvert.SerializeObject(onboardApp);
            var content = new StringContent(serializePayload, Encoding.UTF8, "application/json");

            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.PostAsync($"{Route}", content);

            return response;
        }

        private static async Task<HttpResponseMessage> UpdateOnboardedApp(UserType userType, ApiUpdateOnboardedAppRequest updatedOnboardedApp, string appKey)
        {
            var serializePayload = JsonConvert.SerializeObject(updatedOnboardedApp);
            var content = new StringContent(serializePayload, Encoding.UTF8, "application/json");

            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.PutAsync($"{string.Format(Route)}/{appKey}", content);

            return response;
        }

        private static async Task<HttpResponseMessage> RemoveOnboardedApp(UserType userType, string appKey)
        {
            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.DeleteAsync($"{Route}/{appKey}");

            return response;
        }

        #endregion Helpers
    }
}
