using System.Net;
using System.Text;
using Equinor.ProjectExecutionPortal.Tests.WebApi.Data;
using Equinor.ProjectExecutionPortal.Tests.WebApi.Setup;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.ContextType;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.IntegrationTests
{
    [TestClass]
    public class ContextTypeControllerTests : TestBase
    {
        private const string Route = "api/context-types";

        [TestMethod]
        public async Task Get_ContextTypes_AsAuthenticatedUser_ShouldReturnOk()
        {
            // Act
            var contextTypes = await AssertGetAllContextTypes(UserType.Authenticated, HttpStatusCode.OK);

            // Assert
            Assert.IsTrue(contextTypes.Count == 2);

            foreach (var contextType in contextTypes)
            {
                AssertHelpers.AssertContextTypeValues(contextType);
            }
        }

        [TestMethod]
        public async Task Get_ContextTypes_AsAdministratorUser_ShouldReturnOk()
        {
            // Act
            var contextTypes = await AssertGetAllContextTypes(UserType.Administrator, HttpStatusCode.OK);

            // Assert
            Assert.IsTrue(contextTypes.Count == 2);

            foreach (var contextType in contextTypes)
            {
                AssertHelpers.AssertContextTypeValues(contextType);
            }
        }

        [TestMethod]
        public async Task Get_ContextTypes_AsAnonymous_ShouldReturnUnauthorized()
        {
            // Act
            var contextTypes = await AssertGetAllContextTypes(UserType.Anonymous, HttpStatusCode.Unauthorized);

            // Assert
            Assert.IsNull(contextTypes);
        }

        [TestMethod]
        public async Task Add_Valid_ContextType_AsAdministratorUser_ShouldReturnCreated()
        {
            // Arrange
            var getAllBeforeAdded = await AssertGetAllContextTypes(UserType.Administrator, HttpStatusCode.OK);

            var payload = new ApiAddContextTypeRequest
            {
                Type = ContextTypeData.ValidData.ContractContextTypeKey
            };

            // Act
            var response = await AddContextType(UserType.Administrator, payload);

            // Assert
            var getAllAfterAdded = await AssertGetAllContextTypes(UserType.Administrator, HttpStatusCode.OK);

            Assert.AreEqual(HttpStatusCode.Created, response.StatusCode);
            Assert.IsNotNull(getAllBeforeAdded);
            Assert.IsNotNull(getAllAfterAdded);
            Assert.AreEqual(getAllBeforeAdded.Count + 1, getAllAfterAdded.Count);
            Assert.AreEqual(payload.Type, getAllAfterAdded.Last().Type);
        }

        [TestMethod]
        public async Task Add_Valid_ContextType_AsAuthenticatedUser_ShouldReturnForbidden()
        {
            // Arrange
            var payload = new ApiAddContextTypeRequest
            {
                Type = ContextTypeData.ValidData.ContractContextTypeKey
            };

            // Act
            var response = await AddContextType(UserType.Authenticated, payload);

            // Assert
            Assert.AreEqual(HttpStatusCode.Forbidden, response.StatusCode);
        }

        [TestMethod]
        public async Task Add_Valid_ContextType_AsAnonymousUser_ShouldReturnUnauthorized()
        {
            // Arrange
            var payload = new ApiAddContextTypeRequest
            {
                Type = ContextTypeData.ValidData.ContractContextTypeKey
            };

            // Act
            var response = await AddContextType(UserType.Anonymous, payload);

            // Assert
            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [TestMethod]
        public async Task Add_NonExistent_ContextType_AsAdministratorUser_ShouldReturnNotFound()
        {
            // Arrange
            var payload = new ApiAddContextTypeRequest
            {
                Type = ContextTypeData.InvalidData.InvalidContextTypeKey
            };

            // Act
            var response = await AddContextType(UserType.Administrator, payload);

            // Assert
            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }

        [TestMethod]
        public async Task Add_Duplicate_ContextType_AsAdministratorUser_ShouldReturnConflict()
        {
            // Arrange
            var payload = new ApiAddContextTypeRequest
            {
                Type = ContextTypeData.InitialSeedData.ContextType1.ContextTypeKey
            };

            // Act
            var addDuplicateResponse = await AddContextType(UserType.Administrator, payload);

            // Assert
            Assert.AreEqual(HttpStatusCode.Conflict, addDuplicateResponse.StatusCode);
        }

        [TestMethod]
        public async Task Remove_ContextType_WithoutPortals_AsAdministratorUser_ShouldReturnOk()
        {
            // Arrange
            var payload = ContextTypeData.InitialSeedData.ContextType2.ContextTypeKey;

            // Act
            var getAllBefore = await AssertGetAllContextTypes(UserType.Administrator, HttpStatusCode.OK);

            var removeResponse = await RemoveContextType(UserType.Administrator, payload);

            var getAllAfterRemoval = await AssertGetAllContextTypes(UserType.Administrator, HttpStatusCode.OK);

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, removeResponse.StatusCode);
            Assert.IsNotNull(getAllBefore.Count);
            Assert.IsNotNull(getAllAfterRemoval.Count);
            Assert.AreEqual(getAllBefore.Count - 1, getAllAfterRemoval.Count);
        }

        [TestMethod]
        public async Task Remove_ContextType_WithPortals_AsAdministratorUser_ShouldReturnBadRequest()
        {
            // Arrange
            var payload = ContextTypeData.InitialSeedData.ContextType1.ContextTypeKey;

            // Act
            var getAllBefore = await AssertGetAllContextTypes(UserType.Administrator, HttpStatusCode.OK);

            var removeResponse = await RemoveContextType(UserType.Administrator, payload);

            var getAllAfter = await AssertGetAllContextTypes(UserType.Administrator, HttpStatusCode.OK);

            // Assert
            Assert.AreEqual(HttpStatusCode.BadRequest, removeResponse.StatusCode);
            Assert.AreEqual(getAllBefore.Count, getAllAfter.Count);
        }

        [TestMethod]
        public async Task Remove_ContextType_AsAuthenticatedUser_ShouldReturnForbidden()
        {
            // Arrange
            var existingContextTypeKey = ContextTypeData.InitialSeedData.ContextType1.ContextTypeKey;

            // Act
            var getAllBefore = await AssertGetAllContextTypes(UserType.Administrator, HttpStatusCode.OK);

            var removeResponse = await RemoveContextType(UserType.Authenticated, existingContextTypeKey);

            var getAllAfter = await AssertGetAllContextTypes(UserType.Administrator, HttpStatusCode.OK);

            // Assert
            Assert.AreEqual(HttpStatusCode.Forbidden, removeResponse.StatusCode);
            Assert.AreEqual(getAllBefore.Count, getAllAfter.Count);
        }

        [TestMethod]
        public async Task Remove_ContextType_AsAnonymousUser_ShouldReturnUnauthorized()
        {
            // Arrange
            var existingContextTypeKey = ContextTypeData.InitialSeedData.ContextType1.ContextTypeKey;

            // Act
            var getAllBefore = await AssertGetAllContextTypes(UserType.Administrator, HttpStatusCode.OK);

            var removeResponse = await RemoveContextType(UserType.Anonymous, existingContextTypeKey);

            var getAllAfter = await AssertGetAllContextTypes(UserType.Administrator, HttpStatusCode.OK);

            // Assert
            Assert.AreEqual(HttpStatusCode.Unauthorized, removeResponse.StatusCode);
            Assert.AreEqual(getAllBefore.Count, getAllAfter.Count);
        }

        #region Helpers

        private static async Task<IList<ApiContextType>> AssertGetAllContextTypes(UserType userType, HttpStatusCode expectedStatusCode)
        {
            // Act
            var response = await GetAllContextTypes(userType);
            var content = await response.Content.ReadAsStringAsync();
            var contextTypes = JsonConvert.DeserializeObject<IList<ApiContextType>>(content);

            // Assert
            Assert.AreEqual(expectedStatusCode, response.StatusCode);

            if (response.StatusCode != HttpStatusCode.OK)
            {
                return contextTypes;
            }

            Assert.IsNotNull(content);
            Assert.IsNotNull(contextTypes);

            return contextTypes;
        }

        private static async Task<HttpResponseMessage> AddContextType(UserType userType, ApiAddContextTypeRequest contextType)
        {
            var serializePayload = JsonConvert.SerializeObject(contextType);
            var content = new StringContent(serializePayload, Encoding.UTF8, "application/json");

            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.PostAsync($"{Route}", content);

            return response;
        }

        private static async Task<HttpResponseMessage> GetAllContextTypes(UserType userType)
        {
            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.GetAsync($"{Route}");

            return response;
        }

        private static async Task<HttpResponseMessage> RemoveContextType(UserType userType, string contextTypeKey)
        {
            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.DeleteAsync($"{Route}/{contextTypeKey}");

            return response;
        }

        #endregion Helpers
    }
}
