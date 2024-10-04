using System.Net;
using System.Text;
using Equinor.ProjectExecutionPortal.Tests.WebApi.Data;
using Equinor.ProjectExecutionPortal.Tests.WebApi.Setup;
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
        public async Task Get_OnboardedContexts_AsAdministratorUser_ShouldReturnOk()
        {
            // Act
            var onboardedContext = await AssertGetAllOnboardedContexts(UserType.Administrator, HttpStatusCode.OK);

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
        public async Task Add_Valid_OnboardedContext_AsAdministratorUser_ShouldReturnOk()
        {
            // Arrange
            var getAllBeforeAdded = await AssertGetAllOnboardedContexts(UserType.Administrator, HttpStatusCode.OK);
            var totalCountBeforeAdded = getAllBeforeAdded?.Count;

            var payload = new ApiOnboardContextRequest
            {
                ExternalId = FusionContextData.MongstadFusionContext.ExternalId!,
                Type = FusionContextData.MongstadFusionContext.Type,
                Description = "Some sort of very detailed description"
            };

            // Act
            var response = await AddOnboardedContext(UserType.Administrator, payload);

            // Assert
            var getAllAfterAdded = await AssertGetAllOnboardedContexts(UserType.Administrator, HttpStatusCode.OK);
            var totalCountAfterAdded = getAllAfterAdded?.Count;

            Assert.IsNotNull(totalCountBeforeAdded);
            Assert.IsNotNull(totalCountAfterAdded);
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.AreEqual(totalCountBeforeAdded + 1, totalCountAfterAdded);
        }

        [TestMethod]
        public async Task Add_Valid_OnboardedContext_AsAuthenticatedUser_ShouldReturnForbidden()
        {
            // Arrange
            var payload = new ApiOnboardContextRequest
            {
                ExternalId = OnboardedContextData.InitialSeedData.JcaContext.ExternalId,
                Type = OnboardedContextData.InitialSeedData.JcaContext.Type,
                Description = "Description from test method"
            };

            // Act
            var response = await AddOnboardedContext(UserType.Authenticated, payload);

            // Assert
            Assert.AreEqual(HttpStatusCode.Forbidden, response.StatusCode);
        }

        [TestMethod]
        public async Task Add_Valid_OnboardedContext_AsAnonymousUser_ShouldReturnUnauthorized()
        {
            // Arrange
            var payload = new ApiOnboardContextRequest
            {
                ExternalId = OnboardedContextData.InitialSeedData.JcaContext.ExternalId,
                Type = OnboardedContextData.InitialSeedData.JcaContext.Type,
                Description = "Description from test method"
            };

            // Act
            var response = await AddOnboardedContext(UserType.Anonymous, payload);

            // Assert
            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [TestMethod]
        public async Task Add_NonExistent_OnboardedContext_AsAdministratorUser_ShouldThrowExeption()
        {
            // Arrange
            var payload = new ApiOnboardContextRequest
            {
                ExternalId = "1337olol-392f-4d7e-bb14-79a006571337",
                Type = "tanteSofie",
                Description = "A non-existent context"
            };

            // Act
            var response = await AddOnboardedContext(UserType.Administrator, payload);

            // Assert
            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }

        [TestMethod]
        public async Task Add_Duplicate_OnboardedContext_AsAdministratorUser_ShouldThrowException()
        {
            // Arrange
            var payload = new ApiOnboardContextRequest
            {
                ExternalId = OnboardedContextData.InitialSeedData.JcaContext.ExternalId,
                Type = OnboardedContextData.InitialSeedData.JcaContext.Type,
                Description = "Description from test method"
            };

            // Act
            var addDuplicateResponse = await AddOnboardedContext(UserType.Administrator, payload);

            // Assert
            Assert.AreEqual(HttpStatusCode.Conflict, addDuplicateResponse.StatusCode);
        }

        [TestMethod]
        public async Task Remove_OnboardedContext_AsAdministratorUser_ShouldReturnOk()
        {
            // Arrange
            var ogpExternalContextId = OnboardedContextData.InitialSeedData.OgpContext.ExternalId;

            // Act
            var getAllBeforeRemoval = await AssertGetAllOnboardedContexts(UserType.Administrator, HttpStatusCode.OK);
            var payload = getAllBeforeRemoval!.First(x => x.ExternalId == ogpExternalContextId);

            var removeResponse = await RemoveOnboardedContext(UserType.Administrator, payload.Id);

            var getAllAfterRemoval = await AssertGetAllOnboardedContexts(UserType.Administrator, HttpStatusCode.OK);

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, removeResponse.StatusCode);
            Assert.AreEqual(getAllBeforeRemoval?.Count - 1, getAllAfterRemoval?.Count);
        }

        [TestMethod]
        public async Task Remove_OnboardedContext_AsAuthenticatedUser_ShouldReturnForbidden()
        {
            // Arrange
            var existingOnboardedContextExternalId = OnboardedContextData.InitialSeedData.JcaContext.Id;

            // Act
            var removeResponse = await RemoveOnboardedContext(UserType.Authenticated, existingOnboardedContextExternalId);

            // Assert
            Assert.AreEqual(HttpStatusCode.Forbidden, removeResponse.StatusCode);
        }

        [TestMethod]
        public async Task Remove_OnboardedContext_AsAnonymousUser_ShouldReturnUnauthorized()
        {
            // Arrange
            var existingOnboardedContextExternalId = OnboardedContextData.InitialSeedData.JcaContext.Id;

            // Act
            var removeResponse = await RemoveOnboardedContext(UserType.Anonymous, existingOnboardedContextExternalId);

            // Assert
            Assert.AreEqual(HttpStatusCode.Unauthorized, removeResponse.StatusCode);
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

        private static async Task<HttpResponseMessage> RemoveOnboardedContext(UserType userType, Guid id)
        {
            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.DeleteAsync($"{Route}/{id}");

            return response;
        }

        #endregion Helpers
    }
}
