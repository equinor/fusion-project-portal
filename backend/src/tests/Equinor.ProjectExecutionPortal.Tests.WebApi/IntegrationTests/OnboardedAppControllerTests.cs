using System.Net;
using System.Text;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
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
            Assert.IsNotNull(onboardedApps.FirstOrDefault()?.AppKey);
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
        public async Task Add_Valid_OnboardedApp_AsAuthenticatedUser_ShouldReturnOk()
        {
            // Arrange
            var getAllBeforeAdded = await AssertGetAllOnboardedApps(UserType.Authenticated, HttpStatusCode.OK);
            var totalCountBeforeAdded = getAllBeforeAdded?.Count;

            var addOnboardedAppPayload = new ApiOnboardAppRequest
            {
                AppKey = "test-app"
            };

            // Act
            var response = await AddOnboardedApp(UserType.Authenticated, addOnboardedAppPayload);

            // Assert
            var getAllAfterAdded = await AssertGetAllOnboardedApps(UserType.Authenticated, HttpStatusCode.OK);
            var totalCountAfterAdded = getAllAfterAdded?.Count;

            Assert.IsNotNull(totalCountBeforeAdded);
            Assert.IsNotNull(totalCountAfterAdded);
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
            Assert.AreEqual(totalCountAfterAdded, totalCountBeforeAdded + 1);
        }

        [TestMethod]
        public async Task Add_Valid_OnboardedApp_AsAnonymousUser_ShouldReturnUnauthorized()
        {
            // Arrange
            var addOnboardedAppPayload = new ApiOnboardAppRequest
            {
                AppKey = "test-app"
            };

            // Act
            var response = await AddOnboardedApp(UserType.Anonymous, addOnboardedAppPayload);

            // Assert
            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Ignore] // TODO: Mock service must accept dynamic values
        [TestMethod]
        public async Task Add_Invalid_OnboardedApp_AsAuthenticatedUser_ShouldThrowExeption()
        {
            // Arrange
            var addOnboardedAppPayload = new ApiOnboardAppRequest
            {
                AppKey = "i-do-not-exist"
            };

            // Act
            var response = await AddOnboardedApp(UserType.Anonymous, addOnboardedAppPayload);

            // Assert
            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [TestMethod]
        public async Task Add_Duplicate_OnboardedApp_AsAuthenticatedUser_ShouldThrowException()
        {
            // Arrange
            var addOnboardedAppPayload = new ApiOnboardAppRequest
            {
                AppKey = OnboardedAppsData.InitialSeedData.OrgChartApp.AppKey
            };

            // Act & Assert
            await Assert.ThrowsExceptionAsync<InvalidActionException>(() => AddOnboardedApp(UserType.Authenticated, addOnboardedAppPayload));
        }

        [TestMethod]
        public async Task Remove_OnboardedApp_AsAuthenticatedUser_ShouldReturnOk()
        {
            // Arrange
            var addOnboardedAppPayload = new ApiOnboardAppRequest
            {
                AppKey = "app-to-be-removed"
            };

            // Act
            await AddOnboardedApp(UserType.Authenticated, addOnboardedAppPayload);

            var getAllAfterAdded = await AssertGetAllOnboardedApps(UserType.Authenticated, HttpStatusCode.OK);
            var totalCountAfterAdded = getAllAfterAdded?.Count;

            var removeResponse = await RemoveOnboardedApp(UserType.Authenticated, addOnboardedAppPayload.AppKey);

            var getAllAfterRemoval = await AssertGetAllOnboardedApps(UserType.Authenticated, HttpStatusCode.OK);
            var totalCountAfterRemoval = getAllAfterRemoval?.Count;

            // Assert
            Assert.IsNotNull(totalCountAfterAdded);
            Assert.IsNotNull(totalCountAfterRemoval);
            Assert.AreEqual(removeResponse.StatusCode, HttpStatusCode.NoContent);
            Assert.AreEqual(totalCountAfterRemoval, totalCountAfterAdded - 1);
        }

        [TestMethod]
        public async Task Remove_OnboardedApp_AsAnonymousUser_ShouldReturnUnauthorized()
        {
            // Arrange
            var existingOnboardedAppKey = OnboardedAppsData.InitialSeedData.OrgChartApp.AppKey;

            // Act
            var removeResponse = await RemoveOnboardedApp(UserType.Anonymous, existingOnboardedAppKey);

            // Assert
            Assert.AreEqual(removeResponse.StatusCode, HttpStatusCode.Unauthorized);
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

            return onboardedApps;
        }

        private static async Task<HttpResponseMessage> AddOnboardedApp(UserType userType, ApiOnboardAppRequest onboardApp)
        {
            var serializePayload = JsonConvert.SerializeObject(onboardApp);
            var content = new StringContent(serializePayload, Encoding.UTF8, "application/json");

            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.PostAsync($"{Route}", content);

            return response;
        }

        private static async Task<HttpResponseMessage> GetAllOnboardedApps(UserType userType)
        {
            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.GetAsync($"{Route}");

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
