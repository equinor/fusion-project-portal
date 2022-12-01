using System.Net;
using System.Text;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Tests.WebApi.Setup;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceAppGroup;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.IntegrationTests
{
    [TestClass]
    public class WorkSurfaceAppGroupControllerTests : TestBase
    {
        private const string Route = "api/work-surfaces/{0}/app-groups";

        [TestMethod]
        public async Task Get_AppGroupsForWorkSurface_AsAuthenticatedUser_ShouldReturnOk()
        {
            // Arrange
            var workSurfaces = await WorkSurfaceControllerTests.AssertGetAllWorksurfaces(UserType.Authenticated, HttpStatusCode.OK);
            var workSurfaceToTest = workSurfaces?.Single(x => x.Order == 1);
            Assert.IsNotNull(workSurfaceToTest);

            // Act
            var appGroups = await AssertGetAllAppGroupsForWorkSurface(workSurfaceToTest.Id, UserType.Authenticated, HttpStatusCode.OK);

            // Assert
            Assert.IsNotNull(appGroups);
            Assert.IsTrue(appGroups.Count > 0);
        }

        [TestMethod]
        public async Task Get_AppGroupsForWorkSurface_AsAnonymous_ShouldReturnUnauthorized()
        {
            // Act & Assert
            await AssertGetAllAppGroupsForWorkSurface(Guid.NewGuid(), UserType.Anonymous, HttpStatusCode.Unauthorized);
        }

        [TestMethod]
        public async Task Get_AppGroupsForNonExistentWorkSurface_AsAuthenticatedUser_ShouldReturnNotFound()
        {
            // Act & Assert
            await Assert.ThrowsExceptionAsync<NotFoundException>(() => GetAllAppGroupsForWorkSurface(Guid.NewGuid(), UserType.Authenticated));
        }

        [TestMethod]
        public async Task Add_Valid_AppGroupToWorkSurface_AsAuthenticatedUser_ShouldReturnOk()
        {
            // Arrange
            var workSurfaces = await WorkSurfaceControllerTests.AssertGetAllWorksurfaces(UserType.Authenticated, HttpStatusCode.OK);
            var workSurfaceToTest = workSurfaces?.Single(x => x.Order == 1);
            Assert.IsNotNull(workSurfaceToTest);

            var getAllBeforeAdded = await AssertGetAllAppGroupsForWorkSurface(workSurfaceToTest.Id, UserType.Authenticated, HttpStatusCode.OK);
            var totalCountBeforeAdded = getAllBeforeAdded?.Count;

            var payload = new ApiCreateWorkSurfaceAppGroupRequest
            {
                Name = "A newly added appGroup",
                AccentColor = "#e62cba"
            };

            // Act
            var response = await AddAppGroupToWorkSurface(payload, workSurfaceToTest.Id, UserType.Authenticated);

            // Assert
            var getAllAfterAdded = await AssertGetAllAppGroupsForWorkSurface(workSurfaceToTest.Id, UserType.Authenticated, HttpStatusCode.OK);
            var totalCountAfterAdded = getAllAfterAdded?.Count;

            Assert.IsNotNull(totalCountBeforeAdded);
            Assert.IsNotNull(totalCountAfterAdded);
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
            Assert.AreEqual(totalCountAfterAdded, totalCountBeforeAdded + 1);
        }

        [TestMethod]
        public async Task Add_Valid_AppGroupToWorkSurface_AsAnonymousUser_ShouldReturnUnauthorized()
        {
            // Arrange
            var payload = new ApiCreateWorkSurfaceAppGroupRequest
            {
                Name = "A newly added appGroup",
                AccentColor = "#e62cba"
            };

            // Act
            var response = await AddAppGroupToWorkSurface(payload, Guid.NewGuid(), UserType.Anonymous);

            // Assert
            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [TestMethod]
        public async Task Delete_AppGroupFromWorkSurface_AsAuthenticatedUser_ShouldReturnOk()
        {
            // Arrange
            var workSurfaces = await WorkSurfaceControllerTests.AssertGetAllWorksurfaces(UserType.Authenticated, HttpStatusCode.OK);
            var workSurfaceToTest = workSurfaces?.Single(x => x.Order == 1);
            Assert.IsNotNull(workSurfaceToTest);

            var payload = new ApiCreateWorkSurfaceAppGroupRequest
            {
                Name = "A soon to be deleted appGroup",
                AccentColor = "#e62cba"
            };

            // Act
            await AddAppGroupToWorkSurface(payload, workSurfaceToTest.Id, UserType.Authenticated);

            var getAllAfterAdded = await AssertGetAllAppGroupsForWorkSurface(workSurfaceToTest.Id, UserType.Authenticated, HttpStatusCode.OK);
            var totalCountAfterAdded = getAllAfterAdded?.Count;
            var createdAppGroupId = getAllAfterAdded!.First(x => x.Name == payload.Name).Id;

            var removeResponse = await DeleteAppGroupFromWorkSurface(workSurfaceToTest.Id, createdAppGroupId, UserType.Authenticated);

            var getAllAfterRemoval = await AssertGetAllAppGroupsForWorkSurface(workSurfaceToTest.Id, UserType.Authenticated, HttpStatusCode.OK);
            var totalCountAfterRemoval = getAllAfterRemoval?.Count;

            // Assert
            Assert.IsNotNull(totalCountAfterAdded);
            Assert.IsNotNull(totalCountAfterRemoval);
            Assert.AreEqual(removeResponse.StatusCode, HttpStatusCode.NoContent);
            Assert.AreEqual(totalCountAfterRemoval, totalCountAfterAdded - 1);
        }

        [TestMethod]
        public async Task Update_Valid_AppGroupInWorkSurface_AsAuthenticatedUser_ShouldReturnOk()
        {
            // Arrange
            var workSurfaces = await WorkSurfaceControllerTests.AssertGetAllWorksurfaces(UserType.Authenticated, HttpStatusCode.OK);
            var workSurfaceToTest = workSurfaces?.Single(x => x.Order == 1);
            Assert.IsNotNull(workSurfaceToTest);

            var getAllBeforeAdded = await AssertGetAllAppGroupsForWorkSurface(workSurfaceToTest.Id, UserType.Authenticated, HttpStatusCode.OK);
            var theOneToUpdate = getAllBeforeAdded!.First();

            var payload = new ApiUpdateWorkSurfaceAppGroupRequest
            {
                Name = "An updated app group",
                AccentColor = "#93f542"
            };

            // Act
            var response = await UpdateAppGroupInWorkSurface(payload, theOneToUpdate.Id, workSurfaceToTest.Id, UserType.Authenticated);

            // Assert
            var getAllAfterAdded = await AssertGetAllAppGroupsForWorkSurface(workSurfaceToTest.Id, UserType.Authenticated, HttpStatusCode.OK);
            var theOneAfterUpdate = getAllAfterAdded!.First(x => x.Id == theOneToUpdate.Id);

            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
            Assert.AreEqual(theOneToUpdate.Id, theOneAfterUpdate.Id);
            Assert.AreNotEqual(theOneToUpdate.Name, theOneAfterUpdate.Name);
            Assert.AreNotEqual(theOneToUpdate.AccentColor, theOneAfterUpdate.AccentColor);
        }

        [TestMethod]
        public async Task Update_Valid_AppGroupInWorkSurface_AsAnonymousUser_ShouldReturnUnauthorized()
        {
            // Arrange
            var payload = new ApiUpdateWorkSurfaceAppGroupRequest
            {
                Name = "An updated app group",
                AccentColor = "#93f542"
            };

            // Act
            var response = await UpdateAppGroupInWorkSurface(payload, Guid.NewGuid(), Guid.NewGuid(), UserType.Anonymous);

            // Assert
            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [TestMethod]
        public async Task Reorder_AppGroupsInWorkSurface_AsAuthenticatedUser_ShouldReturnOk()
        {
            // Arrange
            var workSurfaces = await WorkSurfaceControllerTests.AssertGetAllWorksurfaces(UserType.Authenticated, HttpStatusCode.OK);
            var workSurfaceToTest = workSurfaces?.Single(x => x.Order == 1);
            Assert.IsNotNull(workSurfaceToTest);

            var getAllBefore = await AssertGetAllAppGroupsForWorkSurface(workSurfaceToTest.Id, UserType.Authenticated, HttpStatusCode.OK);

            var payload = new ApiReorderAppGroupsRequest
            {
                ReorderedAppGroupIds = getAllBefore!.OrderByDescending(x => x.Order).Select(x => x.Id).ToList()
            };

            // Act
            var response = await ReorderAppGroupsInWorkSurface(payload, workSurfaceToTest.Id, UserType.Authenticated);

            // Assert
            var getAllAfter = await AssertGetAllAppGroupsForWorkSurface(workSurfaceToTest.Id, UserType.Authenticated, HttpStatusCode.OK);

            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
            Assert.AreEqual(getAllBefore!.Count, getAllAfter!.Count);
            Assert.AreNotEqual(getAllBefore.First().Name, getAllAfter.First().Name);
            Assert.AreNotEqual(getAllBefore.Last().Name, getAllAfter.Last().Name);
        }

        [TestMethod]
        public async Task Reorder_AppGroupsInWorkSurface_AsAnonymousUser_ShouldReturnUnauthorized()
        {
            // Arrange
            var payload = new ApiReorderAppGroupsRequest
            {
                ReorderedAppGroupIds = new List<Guid>{Guid.NewGuid(), Guid.NewGuid()}
            };

            // Act
            var response = await ReorderAppGroupsInWorkSurface(payload, Guid.NewGuid(), UserType.Anonymous);

            // Assert
            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [TestMethod]
        public async Task Delete_NonExistentAppGroupFromWorkSurface_AsAuthenticatedUser_ShouldReturnNotFound()
        {
            // Act & Assert
            await Assert.ThrowsExceptionAsync<NotFoundException>(() => DeleteAppGroupFromWorkSurface(Guid.NewGuid(), Guid.NewGuid(), UserType.Authenticated));
        }

        [TestMethod]
        public async Task Remove_OnboardedApp_AsAnonymousUser_ShouldReturnUnauthorized()
        {
            // Act
            var removeResponse = await DeleteAppGroupFromWorkSurface(Guid.NewGuid(), Guid.NewGuid(), UserType.Anonymous);

            // Assert
            Assert.AreEqual(removeResponse.StatusCode, HttpStatusCode.Unauthorized);
        }

        #region Helpers

        private static async Task<IList<ApiWorkSurfaceAppGroup>?> AssertGetAllAppGroupsForWorkSurface(Guid workSurfaceId, UserType userType, HttpStatusCode expectedStatusCode)
        {
            // Act
            var response = await GetAllAppGroupsForWorkSurface(workSurfaceId, userType);
            var content = await response.Content.ReadAsStringAsync();
            var appGroups = JsonConvert.DeserializeObject<IList<ApiWorkSurfaceAppGroup>>(content);

            // Assert
            Assert.AreEqual(expectedStatusCode, response.StatusCode);

            if (response.StatusCode != HttpStatusCode.OK)
            {
                return appGroups;
            }

            Assert.IsNotNull(content);
            Assert.IsNotNull(appGroups);

            foreach (var appGroup in appGroups)
            {
                AssertHelpers.AssertWorkSurfaceAppGroupValues(appGroup);
                Assert.AreEqual(appGroup.Apps.Count, 0); // No relational data should be included in this request
            }

            return appGroups;
        }

        private static async Task<HttpResponseMessage> GetAllAppGroupsForWorkSurface(Guid workSurfaceId, UserType userType)
        {
            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.GetAsync(string.Format(Route, workSurfaceId));

            return response;
        }

        private static async Task<HttpResponseMessage> AddAppGroupToWorkSurface(ApiCreateWorkSurfaceAppGroupRequest newAppGroup, Guid workSurfaceId, UserType userType)
        {
            var serializePayload = JsonConvert.SerializeObject(newAppGroup);
            var content = new StringContent(serializePayload, Encoding.UTF8, "application/json");

            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.PostAsync(string.Format(Route, workSurfaceId), content);

            return response;
        }

        private static async Task<HttpResponseMessage> UpdateAppGroupInWorkSurface(ApiUpdateWorkSurfaceAppGroupRequest updatedAppGroup, Guid appGroupId, Guid workSurfaceId, UserType userType)
        {
            var serializePayload = JsonConvert.SerializeObject(updatedAppGroup);
            var content = new StringContent(serializePayload, Encoding.UTF8, "application/json");

            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.PutAsync($"{string.Format(Route, workSurfaceId)}/{appGroupId}", content);

            return response;
        }

        private static async Task<HttpResponseMessage> ReorderAppGroupsInWorkSurface(ApiReorderAppGroupsRequest reordredAppGroups, Guid workSurfaceId, UserType userType)
        {
            var serializePayload = JsonConvert.SerializeObject(reordredAppGroups);
            var content = new StringContent(serializePayload, Encoding.UTF8, "application/json");

            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.PutAsync($"{string.Format(Route, workSurfaceId)}/reorder", content);

            return response;
        }

        private static async Task<HttpResponseMessage> DeleteAppGroupFromWorkSurface(Guid workSurfaceId, Guid appGroupId, UserType userType)
        {
            var client = TestFactory.Instance.GetHttpClient(userType);
            var response = await client.DeleteAsync($"{string.Format(Route, workSurfaceId)}/{appGroupId}");

            return response;
        }

        #endregion Helpers
    }
}
