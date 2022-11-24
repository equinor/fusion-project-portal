using System.Net;
using System.Text;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
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
        public async Task Get_OnboardedApps_AsAuthenticatedUser_ShouldReturnOk() => await AssertGetOnboardedApps(UserType.Authenticated);

        [TestMethod]
        public async Task Get_OnboardedApps_AsAnonymous_ShouldReturnUnauthorized() => await AssertGetOnboardedApps(UserType.Anonymous, HttpStatusCode.Unauthorized);

        [TestMethod]
        public async Task Add_Valid_OnboardedApp_AsAuthenticatedUser_ShouldReturnOk()
        {
            var addOnboardedAppPayload = new ApiOnboardAppRequest
            {
                AppKey = "test-app"
            };

            var serializePayload = JsonConvert.SerializeObject(addOnboardedAppPayload);
            var content = new StringContent(serializePayload, Encoding.UTF8, "application/json");

            await AssertAddOnboardedApp(UserType.Authenticated, content);
        }

        //[TestMethod] // TODO: Mock service must accept dynamic values
        //public async Task Add_Invalid_OnboardedApp_AsAuthenticatedUser_ShouldThrowExeption()
        //{
        //    var addOnboardedAppPayload = new ApiOnboardAppRequest
        //    {
        //        AppKey = "i-do-not-exist"
        //    };

        //    var serializePayload = JsonConvert.SerializeObject(addOnboardedAppPayload);
        //    var content = new StringContent(serializePayload, Encoding.UTF8, "application/json");

        //    await AssertAddOnboardedApp(UserType.Authenticated, content, HttpStatusCode.BadRequest);
        //}

        [TestMethod]
        [ExpectedException(typeof(InvalidActionException))]
        public async Task Add_Duplicate_OnboardedApp_AsAuthenticatedUser_ShouldThrowException()
        {
            var createOnboardedAppPayload = new ApiOnboardAppRequest
            {
                AppKey = "one-equinor"
            };

            var serializePayload = JsonConvert.SerializeObject(createOnboardedAppPayload);
            var content = new StringContent(serializePayload, Encoding.UTF8, "application/json");

            await AssertAddOnboardedApp(UserType.Authenticated, content);
        }

        private static async Task AssertGetOnboardedApps(UserType userType, HttpStatusCode expectedHttpStatusCode = HttpStatusCode.OK)
        {
            // Act
            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.GetAsync($"{Route}");

            // Assert
            Assert.AreEqual(expectedHttpStatusCode, response.StatusCode);

            if (expectedHttpStatusCode != HttpStatusCode.OK)
            {
                return;
            }

            var content = await response.Content.ReadAsStringAsync();
            Assert.IsNotNull(content);

            var dto = JsonConvert.DeserializeObject<IList<ApiOnboardedApp>>(content);
            Assert.IsNotNull(dto);
            Assert.IsTrue(dto.Count > 0);
            Assert.IsNotNull(dto.FirstOrDefault()?.AppKey);
        }

        private static async Task AssertAddOnboardedApp(UserType userType, HttpContent content, HttpStatusCode expectedHttpStatusCode = HttpStatusCode.OK)
        {
            // Act
            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.PostAsync($"{Route}", content);

            // Assert
            Assert.AreEqual(expectedHttpStatusCode, response.StatusCode);
        }
    }
}
