using System.Net;
using System.Text;
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

        [TestMethod]
        public async Task Get_AppGroups_AsAuthenticatedUser_ShouldReturnOk()
        {
            // Act
            var appGroups = await AssertGetAllAppGroups(UserType.Authenticated, HttpStatusCode.OK);

            // Assert
            Assert.IsNotNull(appGroups);
            Assert.IsTrue(appGroups.Count > 0);
        }

        [TestMethod]
        public async Task Get_AppGroups_AsAdministratorUser_ShouldReturnOk()
        {
            // Act
            var appGroups = await AssertGetAllAppGroups(UserType.Administrator, HttpStatusCode.OK);

            // Assert
            Assert.IsNotNull(appGroups);
            Assert.IsTrue(appGroups.Count > 0);
        }

        [TestMethod]
        public async Task Get_AppGroups_AsAnonymous_ShouldReturnUnauthorized()
        {
            // Act & Assert
            await AssertGetAllAppGroups(UserType.Anonymous, HttpStatusCode.Unauthorized);
        }

        [TestMethod]
        public async Task Create_Valid_AppGroup_AsAdministratorUser_ShouldReturnOk()
        {
            // Arrange
            var getAllBeforeAdded = await AssertGetAllAppGroups(UserType.Authenticated, HttpStatusCode.OK);
            var totalCountBeforeAdded = getAllBeforeAdded?.Count;

            var payload = new ApiCreateAppGroupRequest
            {
                Name = "A newly added appGroup",
                AccentColor = "#e62cba"
            };

            // Act
            var response = await CreateAppGroup(payload, UserType.Administrator);

            // Assert
            var getAllAfterAdded = await AssertGetAllAppGroups(UserType.Authenticated, HttpStatusCode.OK);
            var totalCountAfterAdded = getAllAfterAdded?.Count;

            Assert.IsNotNull(totalCountBeforeAdded);
            Assert.IsNotNull(totalCountAfterAdded);
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.AreEqual(totalCountBeforeAdded + 1, totalCountAfterAdded);
        }

        [TestMethod]
        public async Task Create_Valid_AppGroup_AsAuthorizedUser_ShouldReturnForbidden()
        {
            // Arrange
            var payload = new ApiCreateAppGroupRequest
            {
                Name = "A newly added appGroup",
                AccentColor = "#e62cba"
            };

            // Act
            var response = await CreateAppGroup(payload, UserType.Authenticated);

            // Assert
            Assert.AreEqual(HttpStatusCode.Forbidden, response.StatusCode);
        }

        [TestMethod]
        public async Task Create_Valid_AppGroup_AsAnonymousUser_ShouldReturnUnauthorized()
        {
            // Arrange
            var payload = new ApiCreateAppGroupRequest
            {
                Name = "A newly added appGroup",
                AccentColor = "#e62cba"
            };

            // Act
            var response = await CreateAppGroup(payload, UserType.Anonymous);

            // Assert
            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [TestMethod]
        public async Task Update_Valid_AppGroup_AsAdministratorUser_ShouldReturnOk()
        {
            // Arrange
            var getAllBeforeUpdated = await AssertGetAllAppGroups(UserType.Administrator, HttpStatusCode.OK);
            var theOneToUpdate = getAllBeforeUpdated!.First();

            var payload = new ApiUpdateAppGroupRequest
            {
                Name = $"{theOneToUpdate.Name} (updated)",
                AccentColor = "#93f542"
            };

            // Act
            var response = await UpdateAppGroup(payload, theOneToUpdate.Id, UserType.Administrator);

            // Assert
            var getAllAfterUpdated = await AssertGetAllAppGroups(UserType.Administrator, HttpStatusCode.OK);
            var theOneAfterUpdate = getAllAfterUpdated!.First(x => x.Id == theOneToUpdate.Id);

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.AreEqual(theOneToUpdate.Id, theOneAfterUpdate.Id);
            Assert.AreNotEqual(theOneToUpdate.Name, theOneAfterUpdate.Name);
            Assert.AreNotEqual(theOneToUpdate.AccentColor, theOneAfterUpdate.AccentColor);
        }

        [TestMethod]
        public async Task Update_Valid_AppGroup_AsAuthenticatedUser_ShouldReturnForbidden()
        {
            // Arrange
            var payload = new ApiUpdateAppGroupRequest
            {
                Name = "Forbidden update",
                AccentColor = "#93f542"
            };

            // Act
            var response = await UpdateAppGroup(payload, Guid.NewGuid(), UserType.Authenticated);

            // Assert
            Assert.AreEqual(HttpStatusCode.Forbidden, response.StatusCode);
        }

        [TestMethod]
        public async Task Update_Valid_AppGroup_AsAnonymousUser_ShouldReturnUnauthorized()
        {
            // Arrange
            var payload = new ApiUpdateAppGroupRequest
            {
                Name = "Unauthorized update",
                AccentColor = "#93f542"
            };

            // Act
            var response = await UpdateAppGroup(payload, Guid.NewGuid(), UserType.Anonymous);

            // Assert
            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [TestMethod]
        public async Task Reorder_AppGroups_AsAdministratorUser_ShouldReturnOk()
        {
            // Arrange
            var getAllBefore = await AssertGetAllAppGroups(UserType.Administrator, HttpStatusCode.OK);

            var payload = new ApiReorderAppGroupsRequest
            {
                ReorderedAppGroupIds = getAllBefore!.OrderByDescending(x => x.Order).Select(x => x.Id).ToList()
            };

            // Act
            var response = await ReorderAppGroups(payload, UserType.Administrator);

            // Assert
            var getAllAfter = await AssertGetAllAppGroups(UserType.Administrator, HttpStatusCode.OK);

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.AreEqual(getAllBefore!.Count, getAllAfter!.Count);
            Assert.AreNotEqual(getAllBefore.First().Name, getAllAfter.First().Name);
            Assert.AreNotEqual(getAllBefore.Last().Name, getAllAfter.Last().Name);
        }

        [TestMethod]
        public async Task Reorder_AppGroups_AsAnonymousUser_ShouldReturnUnauthorized()
        {
            // Arrange
            var payload = new ApiReorderAppGroupsRequest
            {
                ReorderedAppGroupIds = new List<Guid> { Guid.NewGuid(), Guid.NewGuid() }
            };

            // Act
            var response = await ReorderAppGroups(payload, UserType.Anonymous);

            // Assert
            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [TestMethod]
        public async Task Reorder_AppGroups_AsAuthorizedUser_ShouldReturnForbidden()
        {
            // Arrange
            var payload = new ApiReorderAppGroupsRequest
            {
                ReorderedAppGroupIds = new List<Guid> { Guid.NewGuid(), Guid.NewGuid() }
            };

            // Act
            var response = await ReorderAppGroups(payload, UserType.Authenticated);

            // Assert
            Assert.AreEqual(HttpStatusCode.Forbidden, response.StatusCode);
        }

        [TestMethod]
        public async Task Delete_AppGroup_AsAdministratorUser_ShouldReturnOk()
        {
            // Arrange
            var payload = new ApiCreateAppGroupRequest
            {
                Name = "A soon to be deleted appGroup",
                AccentColor = "#e62cba"
            };

            // Act
            await CreateAppGroup(payload, UserType.Administrator);

            var getAllAfterAdded = await AssertGetAllAppGroups(UserType.Administrator, HttpStatusCode.OK);
            var totalCountAfterAdded = getAllAfterAdded?.Count;
            var createdAppGroupId = getAllAfterAdded!.First(x => x.Name == payload.Name).Id;

            var removeResponse = await DeleteAppGroup(createdAppGroupId, UserType.Administrator);

            var getAllAfterRemoval = await AssertGetAllAppGroups(UserType.Authenticated, HttpStatusCode.OK);
            var totalCountAfterRemoval = getAllAfterRemoval?.Count;

            // Assert
            Assert.IsNotNull(totalCountAfterAdded);
            Assert.IsNotNull(totalCountAfterRemoval);
            Assert.AreEqual(HttpStatusCode.OK, removeResponse.StatusCode);
            Assert.AreEqual(totalCountAfterAdded - 1, totalCountAfterRemoval);
        }

        [TestMethod]
        public async Task Delete_NonExistentAppGroup_AsAdministratorUser_ShouldReturnNotFound()
        {
            // Act
            var removeResponse = await DeleteAppGroup(Guid.NewGuid(), UserType.Administrator);

            // Assert
            Assert.AreEqual(HttpStatusCode.NotFound, removeResponse.StatusCode);
        }

        [TestMethod]
        public async Task Delete_AppGroup_AsAuthenticatedUser_ShouldReturnForbidden()
        {
            // Act
            var removeResponse = await DeleteAppGroup(Guid.NewGuid(), UserType.Authenticated);

            // Assert
            Assert.AreEqual(HttpStatusCode.Forbidden, removeResponse.StatusCode);
        }

        [TestMethod]
        public async Task Delete_AppGroup_AsAnonymousUser_ShouldReturnUnauthorized()
        {
            // Act
            var removeResponse = await DeleteAppGroup(Guid.NewGuid(), UserType.Anonymous);

            // Assert
            Assert.AreEqual(removeResponse.StatusCode, HttpStatusCode.Unauthorized);
        }

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

        private static async Task<HttpResponseMessage> CreateAppGroup(ApiCreateAppGroupRequest newAppGroup, UserType userType)
        {
            var serializePayload = JsonConvert.SerializeObject(newAppGroup);
            var content = new StringContent(serializePayload, Encoding.UTF8, "application/json");

            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.PostAsync(string.Format(Route), content);

            return response;
        }

        private static async Task<HttpResponseMessage> UpdateAppGroup(ApiUpdateAppGroupRequest updatedAppGroup, Guid appGroupId, UserType userType)
        {
            var serializePayload = JsonConvert.SerializeObject(updatedAppGroup);
            var content = new StringContent(serializePayload, Encoding.UTF8, "application/json");

            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.PutAsync($"{string.Format(Route)}/{appGroupId}", content);

            return response;
        }

        private static async Task<HttpResponseMessage> ReorderAppGroups(ApiReorderAppGroupsRequest reordredAppGroups, UserType userType)
        {
            var serializePayload = JsonConvert.SerializeObject(reordredAppGroups);
            var content = new StringContent(serializePayload, Encoding.UTF8, "application/json");

            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.PutAsync($"{string.Format(Route)}/reorder", content);

            return response;
        }

        private static async Task<HttpResponseMessage> DeleteAppGroup(Guid appGroupId, UserType userType)
        {
            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.DeleteAsync($"{string.Format(Route)}/{appGroupId}");

            return response;
        }

        #endregion Helpers
    }
}
