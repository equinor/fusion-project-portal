using System.Net;
using System.Text;
using Equinor.ProjectExecutionPortal.Tests.WebApi.Data;
using Equinor.ProjectExecutionPortal.Tests.WebApi.Setup;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.IntegrationTests;

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
        var onboardedApp = await AssertGetOnboardedApp(OnboardedAppData.InitialDbSeedData.MeetingsApp.AppKey, UserType.Authenticated, HttpStatusCode.OK);

        // Assert
        Assert.IsNotNull(onboardedApp);

        AssertHelpers.AssertOnboardedAppValues(onboardedApp);
    }

    [TestMethod]
    public async Task Get_OnboardedApp_AsAdministratorUser_ShouldReturnOk()
    {
        // Act
        var onboardedApp = await AssertGetOnboardedApp(OnboardedAppData.InitialDbSeedData.MeetingsApp.AppKey, UserType.Administrator, HttpStatusCode.OK);

        // Assert
        Assert.IsNotNull(onboardedApp);

        AssertHelpers.AssertOnboardedAppValues(onboardedApp);
    }

    [TestMethod]
    public async Task Get_OnboardedApp_AsAnonymous_ShouldReturnUnauthorized()
    {
        // Act
        var onboardedApp = await AssertGetOnboardedApp(OnboardedAppData.InitialDbSeedData.MeetingsApp.AppKey, UserType.Anonymous, HttpStatusCode.Unauthorized);

        // Assert
        Assert.IsNull(onboardedApp);
    }

    [TestMethod]
    public async Task Add_Valid_OnboardedApp_AsAdministratorUser_ShouldReturnOk()
    {
        // Arrange
        var getAllBeforeAdded = await AssertGetAllOnboardedApps(UserType.Administrator, HttpStatusCode.OK);
        var totalCountBeforeAdded = getAllBeforeAdded?.Count;

        var payload = new ApiOnboardAppRequest
        {
            AppKey = FusionAppApiData.TestApp.AppKey,
            ContextTypes = new List<string> { ContextTypeData.ValidContextTypes.ProjectMasterContextTypeKey }
        };

        // Act
        var response = await AddOnboardedApp(UserType.Administrator, payload);

        // Assert
        var getAllAfterAdded = await AssertGetAllOnboardedApps(UserType.Administrator, HttpStatusCode.OK);
        var totalCountAfterAdded = getAllAfterAdded?.Count;

        Assert.IsNotNull(totalCountBeforeAdded);
        Assert.IsNotNull(totalCountAfterAdded);
        Assert.AreEqual(HttpStatusCode.NoContent, response.StatusCode);
        Assert.AreEqual(totalCountBeforeAdded + 1, totalCountAfterAdded);
    }

    [TestMethod]
    public async Task Add_Invalid_OnboardedApp_AsAdministratorUser_ShouldReturnBadRequest()
    {
        // Arrange
        var payload = new ApiOnboardAppRequest
        {
            AppKey = FusionAppApiData.AppForInvalidContextTest.AppKey,
            ContextTypes = new List<string> { ContextTypeData.InvalidContextTypes.InvalidContextTypeKey }
        };

        // Act
        var response = await AddOnboardedApp(UserType.Administrator, payload);

        // Assert
        Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [TestMethod]
    public async Task Add_Valid_OnboardedApp_AsAuthenticatedUser_ShouldReturnForbidden()
    {
        // Arrange
        var payload = new ApiOnboardAppRequest
        {
            AppKey = FusionAppApiData.TestApp.AppKey,
            ContextTypes = [ContextTypeData.ValidContextTypes.ProjectMasterContextTypeKey]
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
            AppKey = FusionAppApiData.TestApp.AppKey,
            ContextTypes = [ContextTypeData.ValidContextTypes.ProjectMasterContextTypeKey]
        };

        // Act
        var response = await AddOnboardedApp(UserType.Anonymous, payload);

        // Assert
        Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [TestMethod]
    public async Task Add_Invalid_OnboardedApp_AsAdministratorUser_ShouldThrowNotFoundExeption()
    {
        // Arrange
        var payload = new ApiOnboardAppRequest
        {
            AppKey = FusionAppApiData.NonExistentApp.AppKey,
            ContextTypes = [ContextTypeData.ValidContextTypes.ProjectMasterContextTypeKey]
        };

        // Act
        var response = await AddOnboardedApp(UserType.Administrator, payload);

        // Assert
        Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
    }

    [TestMethod]
    public async Task Add_Duplicate_OnboardedApp_AsAdministratorUser_ShouldThrowException()
    {
        // Arrange
        var payload = new ApiOnboardAppRequest
        {
            AppKey = OnboardedAppData.InitialDbSeedData.OrgChartApp.AppKey,
            ContextTypes = [ContextTypeData.ValidContextTypes.ProjectMasterContextTypeKey]
        };

        // Act
        var addDuplicateResponse = await AddOnboardedApp(UserType.Administrator, payload);

        // Assert
        Assert.AreEqual(HttpStatusCode.Conflict, addDuplicateResponse.StatusCode);
    }

    [TestMethod]
    public async Task Update_OnboardedApp_AsAdministratorUser_ShouldReturnOk()
    {
        // Arrange
        var getAllBeforeUpdated = await AssertGetAllOnboardedApps(UserType.Administrator, HttpStatusCode.OK);
        var theOneToUpdate = getAllBeforeUpdated!.First();

        var payload = new ApiUpdateOnboardedAppRequest
        {
            ContextTypes = new List<string>()
        };

        // Act
        var response = await UpdateOnboardedApp(UserType.Administrator, payload, theOneToUpdate.AppKey);

        // Assert
        var getAllAfterAdded = await AssertGetAllOnboardedApps(UserType.Administrator, HttpStatusCode.OK);
        var theOneAfterUpdate = getAllAfterAdded!.First(x => x.Id == theOneToUpdate.Id);

        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        Assert.AreEqual(theOneToUpdate.AppKey, theOneAfterUpdate.AppKey);
        Assert.AreEqual(theOneToUpdate.Contexts.Count, theOneAfterUpdate.Contexts.Count);
    }

    [TestMethod]
    public async Task Update_OnboardedApp_AsAuthenticatedUser_ShouldReturnForbidden()
    {
        // Arrange
        var payload = new ApiUpdateOnboardedAppRequest
        {
            ContextTypes = new List<string>()
        };

        // Act
        var response = await UpdateOnboardedApp(UserType.Authenticated, payload, OnboardedAppData.InitialDbSeedData.OrgChartApp.AppKey);

        // Assert
        Assert.AreEqual(HttpStatusCode.Forbidden, response.StatusCode);
    }

    [TestMethod]
    public async Task Update_OnboardedApp_AsAnonymousUser_ShouldReturnUnauthorized()
    {
        // Arrange
        var payload = new ApiUpdateOnboardedAppRequest
        {
            ContextTypes = new List<string>()
        };

        // Act
        var response = await UpdateOnboardedApp(UserType.Anonymous, payload, OnboardedAppData.InitialDbSeedData.OrgChartApp.AppKey);

        // Assert
        Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [TestMethod]
    public async Task Remove_OnboardedApp_AsAdministratorUser_ShouldReturnOk()
    {
        // Arrange

        var payload = new ApiOnboardAppRequest
        {
            AppKey = FusionAppApiData.TestToBeOffboardedFusion.AppKey,
            ContextTypes = new List<string>() { ContextTypeData.ValidContextTypes.ProjectMasterContextTypeKey }
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
        var existingOnboardedAppKey = OnboardedAppData.InitialDbSeedData.OrgChartApp.AppKey;

        // Act
        var removeResponse = await RemoveOnboardedApp(UserType.Authenticated, existingOnboardedAppKey);

        // Assert
        Assert.AreEqual(HttpStatusCode.Forbidden, removeResponse.StatusCode);
    }

    [TestMethod]
    public async Task Remove_OnboardedApp_AsAnonymousUser_ShouldReturnUnauthorized()
    {
        // Arrange
        var existingOnboardedAppKey = OnboardedAppData.InitialDbSeedData.OrgChartApp.AppKey;

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
            AssertHelpers.AssertAuditValues(app, assertModified: false);
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
        AssertHelpers.AssertAuditValues(onboardedApp, assertModified: false);

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
