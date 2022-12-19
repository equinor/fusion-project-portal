using System.Net;
using Equinor.ProjectExecutionPortal.Tests.WebApi.Setup;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.AppGroup;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.IntegrationTests
{
    [TestClass]
    public class AppGroupControllerTests : TestBase
    {
        private const string Route = "api/app-groups";

        #region Helpers

        public static async Task<IList<ApiAppGroup>?> AssertGetAllAppGroups(UserType userType, HttpStatusCode expectedStatusCode)
        {
            // Act
            var response = await GetAllAppGroups(userType);
            var content = await response.Content.ReadAsStringAsync();
            var appGroups = JsonConvert.DeserializeObject<IList<ApiAppGroup>>(content);

            // Assert
            Assert.AreEqual(expectedStatusCode, response.StatusCode);

            if (response.StatusCode != HttpStatusCode.OK)
            {
                return appGroups;
            }

            Assert.IsNotNull(content);
            Assert.IsNotNull(appGroups);

            return appGroups;
        }

        private static async Task<HttpResponseMessage> GetAllAppGroups(UserType userType)
        {
            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.GetAsync($"{Route}");

            return response;
        }

        #endregion Helpers
    }
}
