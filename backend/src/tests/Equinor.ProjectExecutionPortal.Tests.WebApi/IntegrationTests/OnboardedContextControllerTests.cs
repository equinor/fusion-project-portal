using System.Net;
using System.Text;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Tests.WebApi.Data;
using Equinor.ProjectExecutionPortal.Tests.WebApi.Setup;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedContext;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedContext;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.IntegrationTests
{
    [TestClass]
    public class OnboardedContextControllerTests : TestBase
    {
        private const string Route = "api/onboarded-contexts";

        [TestMethod]
        public async Task Get_OnboardedContexts_AsAuthenticatedUser_ShouldReturnOk()
        {
            // Act
            var onboardedContext = await AssertGetAllOnboardedContexts(UserType.Authenticated, HttpStatusCode.OK);

            // Assert
            Assert.IsNotNull(onboardedContext);
            Assert.IsTrue(onboardedContext.Count > 0);
            Assert.IsNotNull(onboardedContext.FirstOrDefault()?.ExternalId);
        }

        [TestMethod]
        public async Task Get_OnboardedContexts_AsAnonymous_ShouldReturnUnauthorized()
        {
            // Act
            var onboardedContexts = await AssertGetAllOnboardedContexts(UserType.Anonymous, HttpStatusCode.Unauthorized);

            // Assert
            Assert.IsNull(onboardedContexts);
        }

        [TestMethod]
        public async Task Add_Valid_OnboardedContext_AsAuthenticatedUser_ShouldReturnOk()
        {
            // Arrange
            var getAllBeforeAdded = await AssertGetAllOnboardedContexts(UserType.Authenticated, HttpStatusCode.OK);
            var totalCountBeforeAdded = getAllBeforeAdded?.Count;

            var payload = new ApiOnboardContextRequest
            {
                ExternalId = OnboardedContextsData.InitialSeedData.OgpContext.ExternalId,
                Description = "Description from test method"
            };

            // Act
            var response = await AddOnboardedContext(UserType.Authenticated, payload);

            // Assert
            var getAllAfterAdded = await AssertGetAllOnboardedContexts(UserType.Authenticated, HttpStatusCode.OK);
            var totalCountAfterAdded = getAllAfterAdded?.Count;

            Assert.IsNotNull(totalCountBeforeAdded);
            Assert.IsNotNull(totalCountAfterAdded);
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
            Assert.AreEqual(totalCountAfterAdded, totalCountBeforeAdded + 1);
        }

        [TestMethod]
        public async Task Add_Valid_OnboardedContext_AsAnonymousUser_ShouldReturnUnauthorized()
        {
            // Arrange
            var payload = new ApiOnboardContextRequest
            {
                ExternalId = OnboardedContextsData.InitialSeedData.JcaContext.ExternalId,
                Description = "Description from test method"
            };

            // Act
            var response = await AddOnboardedContext(UserType.Anonymous, payload);

            // Assert
            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [TestMethod]
        public async Task Add_NonExistent_OnboardedContext_AsAuthenticatedUser_ShouldThrowExeption()
        {
            // Arrange
            var payload = new ApiOnboardContextRequest
            {
                ExternalId = "1337olol-392f-4d7e-bb14-79a006571337",
                Description = "A non-existent context"
            };

            // Act
            var response = await AddOnboardedContext(UserType.Authenticated, payload);

            // Assert
            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }

        [TestMethod]
        public async Task Add_Duplicate_OnboardedContext_AsAuthenticatedUser_ShouldThrowException()
        {
            // Arrange
            var payload = new ApiOnboardContextRequest
            {
                ExternalId = OnboardedContextsData.InitialSeedData.JcaContext.ExternalId,
                Description = "Description from test method"
            };

            // Act & Assert
            await Assert.ThrowsExceptionAsync<InvalidActionException>(() => AddOnboardedContext(UserType.Authenticated, payload));
        }

        [TestMethod]
        public async Task Remove_OnboardedContext_AsAuthenticatedUser_ShouldReturnOk()
        {
            // Arrange
            var payload = OnboardedContextsData.InitialSeedData.OgpContext.ExternalId;

            // Act
            var getAll = await AssertGetAllOnboardedContexts(UserType.Authenticated, HttpStatusCode.OK);
            var totalCount = getAll?.Count;

            var removeResponse = await RemoveOnboardedContext(UserType.Authenticated, payload);

            var getAllAfterRemoval = await AssertGetAllOnboardedContexts(UserType.Authenticated, HttpStatusCode.OK);
            var totalCountAfterRemoval = getAllAfterRemoval?.Count;

            // Assert
            Assert.IsNotNull(totalCount);
            Assert.IsNotNull(totalCountAfterRemoval);
            Assert.AreEqual(removeResponse.StatusCode, HttpStatusCode.NoContent);
            Assert.AreEqual(totalCountAfterRemoval, totalCount - 1);
        }

        [TestMethod]
        public async Task Remove_OnboardedContext_AsAnonymousUser_ShouldReturnUnauthorized()
        {
            // Arrange
            var existingOnboardedContextExternalId = OnboardedContextsData.InitialSeedData.JcaContext.ExternalId;

            // Act
            var removeResponse = await RemoveOnboardedContext(UserType.Anonymous, existingOnboardedContextExternalId);

            // Assert
            Assert.AreEqual(removeResponse.StatusCode, HttpStatusCode.Unauthorized);
        }

        #region Helpers

        private static async Task<IList<ApiOnboardedContext>?> AssertGetAllOnboardedContexts(UserType userType, HttpStatusCode expectedStatusCode)
        {
            // Act
            var response = await GetAllOnboardedContexts(userType);
            var content = await response.Content.ReadAsStringAsync();
            var onboardedContexts = JsonConvert.DeserializeObject<IList<ApiOnboardedContext>>(content);

            // Assert
            Assert.AreEqual(expectedStatusCode, response.StatusCode);

            if (response.StatusCode != HttpStatusCode.OK)
            {
                return onboardedContexts;
            }

            Assert.IsNotNull(content);
            Assert.IsNotNull(onboardedContexts);

            return onboardedContexts;
        }

        private static async Task<HttpResponseMessage> AddOnboardedContext(UserType userType, ApiOnboardContextRequest onboardContext)
        {
            var serializePayload = JsonConvert.SerializeObject(onboardContext);
            var content = new StringContent(serializePayload, Encoding.UTF8, "application/json");

            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.PostAsync($"{Route}", content);

            return response;
        }

        private static async Task<HttpResponseMessage> GetAllOnboardedContexts(UserType userType)
        {
            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.GetAsync($"{Route}");

            return response;
        }

        private static async Task<HttpResponseMessage> RemoveOnboardedContext(UserType userType, string externalId)
        {
            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.DeleteAsync($"{Route}/{externalId}");

            return response;
        }

        #endregion Helpers
    }
}
