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
            var response = await GetAllOnboardedApps(UserType.Authenticated);
            var content = await response.Content.ReadAsStringAsync();
            var onboardedApps = JsonConvert.DeserializeObject<IList<ApiOnboardedApp>>(content);

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.IsNotNull(content);
            Assert.IsNotNull(onboardedApps);
            Assert.IsTrue(onboardedApps.Count > 0);
            Assert.IsNotNull(onboardedApps.FirstOrDefault()?.AppKey);
        }

        [TestMethod]
        public async Task Get_OnboardedApps_AsAnonymous_ShouldReturnUnauthorized()
        {
            // Act
            var response = await GetAllOnboardedApps(UserType.Anonymous);
            var content = await response.Content.ReadAsStringAsync();
            var onboardedApps = JsonConvert.DeserializeObject<IList<ApiOnboardedApp>>(content);

            // Assert
            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
            Assert.IsNull(onboardedApps);
        }

        [TestMethod]
        public async Task Add_Valid_OnboardedApp_AsAuthenticatedUser_ShouldReturnOk()
        {
            // Arrange
            var getAllBeforeAddedResponse = await GetAllOnboardedApps(UserType.Authenticated);
            var getAllBeforeAddedContent = await getAllBeforeAddedResponse.Content.ReadAsStringAsync();
            var totalCountBeforeAdded = JsonConvert.DeserializeObject<IList<ApiOnboardedApp>>(getAllBeforeAddedContent)?.Count;

            var addOnboardedAppPayload = new ApiOnboardAppRequest
            {
                AppKey = "test-app"
            };

            // Act
            var response = await AddOnboardedApp(UserType.Authenticated, addOnboardedAppPayload);

            // Assert

            var getAllAfterAddedResponse = await GetAllOnboardedApps(UserType.Authenticated);
            var getAllAfterAddedContent = await getAllAfterAddedResponse.Content.ReadAsStringAsync();
            var totalCountAfterAdded = JsonConvert.DeserializeObject<IList<ApiOnboardedApp>>(getAllAfterAddedContent)?.Count;

            if (totalCountBeforeAdded != null && totalCountAfterAdded != null)
            {
                Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
                Assert.AreEqual(totalCountAfterAdded, totalCountBeforeAdded + 1);
            }
            else
            {
                Assert.Fail();
            }
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

            var getAllAfterAddedResponse = await GetAllOnboardedApps(UserType.Authenticated);
            var getAllAfterAddedContent = await getAllAfterAddedResponse.Content.ReadAsStringAsync();
            var totalCountAfterAdded = JsonConvert.DeserializeObject<IList<ApiOnboardedApp>>(getAllAfterAddedContent)?.Count;

            var removeResponse = await RemoveOnboardedApp(UserType.Authenticated, addOnboardedAppPayload.AppKey);

            var getAllAfterRemovalRepsonse = await GetAllOnboardedApps(UserType.Authenticated);
            var getAllAfterRemovalContent = await getAllAfterRemovalRepsonse.Content.ReadAsStringAsync();
            var totalCountAfterRemoval = JsonConvert.DeserializeObject<IList<ApiOnboardedApp>>(getAllAfterRemovalContent)?.Count;

            // Assert
            if (totalCountAfterRemoval != null && totalCountAfterAdded != null)
            {
                Assert.AreEqual(removeResponse.StatusCode, HttpStatusCode.NoContent);
                Assert.AreEqual(totalCountAfterRemoval, totalCountAfterAdded - 1);
            }
            else
            {
                Assert.Fail();
            }
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
    }
}
