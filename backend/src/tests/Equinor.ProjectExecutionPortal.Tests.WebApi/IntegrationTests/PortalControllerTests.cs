using System.Net;
using System.Text;
using Equinor.ProjectExecutionPortal.Tests.WebApi.Data;
using Equinor.ProjectExecutionPortal.Tests.WebApi.Setup;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.Portal;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.PortalApp;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.IntegrationTests;

[TestClass]
public class PortalControllerTests : TestBase
{
    private const string Route = "api/portals";

    [TestMethod]
    public async Task Get_Portals_AsAuthenticatedUser_ShouldReturnOk()
    {
        // Act
        var portals = await AssertGetAllPortals(UserType.Authenticated, HttpStatusCode.OK);

        // Assert
        Assert.IsNotNull(portals);
        Assert.IsTrue(portals.Count > 0);
    }

    [TestMethod]
    public async Task Get_Portals_AsAnonymous_ShouldReturnUnauthorized()
    {
        // Act
        var portals = await AssertGetAllPortals(UserType.Anonymous, HttpStatusCode.Unauthorized);

        // Assert
        Assert.IsNull(portals);
    }

    [TestMethod]
    public async Task Get_Portal_AsAuthenticatedUser_ShouldReturnOk()
    {
        // Arrange
        var portals = await AssertGetAllPortals(UserType.Authenticated, HttpStatusCode.OK);
        var portalToTest = portals?.FirstOrDefault();

        // Act & Assert
        await AssertGetPortal(portalToTest!.Id, UserType.Authenticated, HttpStatusCode.OK);
    }

    [TestMethod]
    public async Task Get_NonExistentPortal_AsAuthenticatedUser_ShouldReturnNotFound()
    {
        // Act & Assert
        await AssertGetPortal(Guid.NewGuid(), UserType.Authenticated, HttpStatusCode.NotFound);
    }

    [TestMethod]
    public async Task Get_Portal_AsAnonymous_ShouldReturnUnauthorized()
    {
        // Act
        var portal = await AssertGetPortal(Guid.NewGuid(), UserType.Anonymous, HttpStatusCode.Unauthorized);

        // Assert
        Assert.IsNull(portal);
    }

    [TestMethod]
    public async Task Create_Portal_AsAdministratorUser_ShouldReturnOk()
    {
        // Arrange
        var getAllBeforeCreation = await AssertGetAllPortals(UserType.Administrator, HttpStatusCode.OK);

        var payload = new ApiCreatePortalRequest
        {
            Name = "Created portal name",
            Description = "Created description",
            ShortName = "Created short name",
            Subtext = "Created subtext",
            Icon = "Created icon",
            ContextTypes = [ContextTypeData.ValidContextTypes.ProjectMasterContextTypeKey]
        };

        // Act
        var response = await CreatePortal(UserType.Administrator, payload);
        var getAllAfterCreation = await AssertGetAllPortals(UserType.Administrator, HttpStatusCode.OK);
        var theOneCreated = getAllAfterCreation!.Last();

        // Assert
        var createdPortal = await AssertGetPortal(theOneCreated.Id, UserType.Authenticated, HttpStatusCode.OK);

        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        Assert.AreEqual(getAllBeforeCreation!.Count + 1, getAllAfterCreation!.Count);
        Assert.AreEqual(theOneCreated.Id, createdPortal!.Id);
        Assert.AreEqual(payload.Name, createdPortal.Name);
        Assert.AreEqual(payload.Description, createdPortal.Description);
        Assert.AreEqual(payload.ShortName, createdPortal.ShortName);
        Assert.AreEqual(payload.Subtext, createdPortal.Subtext);
        Assert.AreEqual(payload.Icon, createdPortal.Icon);
        Assert.AreEqual(payload.ContextTypes.Count, createdPortal.ContextTypes.Count);
    }

    [TestMethod]
    public async Task Create_Portal_AsAuthenticatedUser_ShouldReturnForbidden()
    {
        // Arrange
        var payload = new ApiCreatePortalRequest
        {
            Name = "Created portal name",
            Description = "Created description",
            ShortName = "Created short name",
            Subtext = "Created subtext",
            Icon = "Created icon",
            ContextTypes = [ContextTypeData.ValidContextTypes.ProjectMasterContextTypeKey]
        };

        // Act
        var response = await CreatePortal(UserType.Authenticated, payload);

        // Assert
        Assert.AreEqual(HttpStatusCode.Forbidden, response.StatusCode);
    }

    [TestMethod]
    public async Task Create_Portal_AsAnonymousUser_ShouldReturnUnauthorized()
    {
        // Arrange
        var payload = new ApiCreatePortalRequest
        {
            Name = "Created portal name",
            Description = "Created description",
            ShortName = "Created short name",
            Subtext = "Created subtext",
            Icon = "Created icon",
            ContextTypes = [ContextTypeData.ValidContextTypes.ProjectMasterContextTypeKey]
        };

        // Act
        var response = await CreatePortal(UserType.Anonymous, payload);

        // Assert
        Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [TestMethod]
    public async Task Update_Portal_AsAdministratorUser_ShouldReturnOk()
    {
        // Arrange
        var getAllBeforeUpdated = await AssertGetAllPortals(UserType.Administrator, HttpStatusCode.OK);
        var theOneToUpdate = getAllBeforeUpdated!.First();

        var payload = new ApiUpdatePortalRequest
        {
            Name = "Updated portal name",
            Description = "Updated description",
            ShortName = "Updated short name",
            Subtext = "Updated subtext",
            Icon = "Updated icon",
            ContextTypes = [ContextTypeData.ValidContextTypes.ProjectMasterContextTypeKey]
        };

        // Act
        var response = await UpdatePortal(UserType.Administrator, payload, theOneToUpdate.Id);

        // Assert
        var theOneAfterUpdate = await AssertGetPortal(theOneToUpdate.Id, UserType.Authenticated, HttpStatusCode.OK);

        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        Assert.AreEqual(theOneToUpdate.Id, theOneAfterUpdate!.Id);
        Assert.AreEqual(payload.Name, theOneAfterUpdate.Name);
        Assert.AreEqual(payload.Description, theOneAfterUpdate.Description);
        Assert.AreEqual(payload.ShortName, theOneAfterUpdate.ShortName);
        Assert.AreEqual(payload.Subtext, theOneAfterUpdate.Subtext);
        Assert.AreEqual(payload.Icon, theOneAfterUpdate.Icon);
        Assert.AreEqual(payload.ContextTypes.Count, theOneAfterUpdate.ContextTypes.Count);
        AssertHelpers.AssertAuditValues(theOneAfterUpdate, assertModified: true);
    }

    [TestMethod]
    public async Task Update_Portal_AsAuthenticatedUser_ShouldReturnForbidden()
    {
        // Arrange
        var payload = new ApiUpdatePortalRequest
        {
            Name = "Updated portal name",
            Description = "Updated description",
            ShortName = "Updated short name",
            Subtext = "Updated subtext",
            Icon = "Updated icon",
            ContextTypes = [ContextTypeData.ValidContextTypes.ProjectMasterContextTypeKey]
        };

        // Act
        var response = await UpdatePortal(UserType.Authenticated, payload, Guid.NewGuid());

        // Assert
        Assert.AreEqual(HttpStatusCode.Forbidden, response.StatusCode);
    }

    [TestMethod]
    public async Task Update_Portal_AsAnonymousUser_ShouldReturnUnauthorized()
    {
        // Arrange
        var payload = new ApiUpdatePortalRequest
        {
            Name = "Updated portal name",
            Description = "Updated description",
            ShortName = "Updated short name",
            Subtext = "Updated subtext",
            Icon = "Updated icon",
            ContextTypes = [ContextTypeData.ValidContextTypes.ProjectMasterContextTypeKey]
        };

        // Act
        var response = await UpdatePortal(UserType.Anonymous, payload, Guid.NewGuid());

        // Assert
        Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [TestMethod]
    public async Task Get_PortalConfiguration_AsAuthenticatedUser_ShouldReturnOk()
    {
        // Arrange
        var portals = await AssertGetAllPortals(UserType.Authenticated, HttpStatusCode.OK);
        var portalToTest = portals!.First();

        // Act & Assert
        await AssertGetPortalConfiguration(portalToTest.Id, UserType.Authenticated, HttpStatusCode.OK);
    }

    [TestMethod]
    public async Task Get_NonExistentPortalConfiguration_AsAuthenticatedUser_ShouldReturnNotFound()
    {
        // Act & Assert
        await AssertGetPortalConfiguration(Guid.NewGuid(), UserType.Authenticated, HttpStatusCode.NotFound);
    }

    [TestMethod]
    public async Task Get_PortalConfiguration_AsAnonymous_ShouldReturnUnauthorized()
    {
        // Act
        var portal = await AssertGetPortalConfiguration(Guid.NewGuid(), UserType.Anonymous, HttpStatusCode.Unauthorized);

        // Assert
        Assert.IsNull(portal);
    }

    [TestMethod]
    public async Task Update_PortalConfiguration_AsAdministratorUser_ShouldReturnOk()
    {
        // Arrange
        var getAllBeforeUpdated = await AssertGetAllPortals(UserType.Administrator, HttpStatusCode.OK);
        var portalToTest = getAllBeforeUpdated!.First();
        var theOneToUpdate = await AssertGetPortalConfiguration(portalToTest.Id, UserType.Authenticated, HttpStatusCode.OK);

        var routerData = JsonSerializer.Serialize(
            new
            {
                Router = new { Root = "" },
                Routes = (List<object>)[new { Id = 1 }, new { Id = 2 },]
            }
        );

        var extensionDataData = JsonSerializer.Serialize(
            new
            {
                Extension = new { Root = "" },
                Extensions = (List<object>)[new { Id = 1 }, new { Id = 2 },]
            }
        );

        var environmentData = JsonSerializer.Serialize(
            new
            {
                Environment = new { Root = "" },
                Environments = (List<object>)[new { Id = 1 }, new { Id = 2 },]
            }
        );

        var payload = new ApiUpdatePortalConfigurationRequest
        {
            Router = routerData,
            Extension = extensionDataData,
            Environment = environmentData
        };

        // Act
        var response = await UpdatePortalConfiguration(UserType.Administrator, payload, portalToTest.Id);

        // Assert
        var theOneAfterUpdate = await AssertGetPortalConfiguration(portalToTest.Id, UserType.Authenticated, HttpStatusCode.OK);

        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        Assert.AreNotEqual(payload.Router, theOneToUpdate!.Router);
        Assert.AreEqual(payload.Router, theOneAfterUpdate!.Router);

        Assert.AreNotEqual(payload.Extension, theOneToUpdate.Extension);
        Assert.AreEqual(payload.Extension, theOneAfterUpdate.Extension);

        Assert.AreNotEqual(payload.Environment, theOneToUpdate.Environment);
        Assert.AreEqual(payload.Environment, theOneAfterUpdate.Environment);

        AssertHelpers.AssertAuditValues(theOneAfterUpdate, assertModified: true);
    }

    [TestMethod]
    public async Task Update_PortalConfiguration_AsAuthenticatedUser_ShouldReturnForbidden()
    {
        // Arrange
        var payload = new ApiUpdatePortalConfigurationRequest();

        // Act
        var response = await UpdatePortalConfiguration(UserType.Authenticated, payload, Guid.NewGuid());

        // Assert
        Assert.AreEqual(HttpStatusCode.Forbidden, response.StatusCode);
    }

    [TestMethod]
    public async Task Update_PortalConfiguration_AsAnonymousUser_ShouldReturnUnauthorized()
    {
        // Arrange
        var payload = new ApiUpdatePortalConfigurationRequest();

        // Act
        var response = await UpdatePortalConfiguration(UserType.Anonymous, payload, Guid.NewGuid());

        // Assert
        Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [TestMethod]
    public async Task Get_OnlyGlobalAppKeysForPortal_WithoutContext_AsAuthenticatedUser_ShouldReturnOk()
    {
        // Arrange
        var portals = await AssertGetAllPortals(UserType.Authenticated, HttpStatusCode.OK);
        var portalToTest = portals?.SingleOrDefault(x => x.Key == PortalData.InitialDbSeedData.ProjectExecution.Key);

        // Act
        var apps = await AssertGetAppKeysForPortal(portalToTest!.Id, null, UserType.Authenticated, HttpStatusCode.OK);

        // Assert
        Assert.IsNotNull(apps);
        Assert.AreEqual(4, apps.Count);
    }

    [TestMethod]
    public async Task Get_BothGlobalAndContextAppKeysForPortal_WithValidContext_AsAuthenticatedUser_ShouldReturnOk()
    {
        // Arrange
        var portals = await AssertGetAllPortals(UserType.Authenticated, HttpStatusCode.OK);
        var portalToTest = portals?.SingleOrDefault(x => x.Key == PortalData.InitialDbSeedData.ProjectExecution.Key);

        // Act
        var apps = await AssertGetAppKeysForPortal(portalToTest!.Id, FusionContextApiData.JcaContextId, UserType.Authenticated, HttpStatusCode.OK);

        // Assert
        Assert.IsNotNull(apps);
        Assert.AreEqual(6, apps.Count);
    }

    [TestMethod]
    public async Task Get_BothGlobalAndContextAppKeysForPortal_WithInvalidContext_AsAuthenticatedUser_ShouldReturn404()
    {
        // Arrange
        var portals = await AssertGetAllPortals(UserType.Authenticated, HttpStatusCode.OK);
        var portalToTest = portals?.SingleOrDefault(x => x.Key == PortalData.InitialDbSeedData.ProjectExecution.Key);

        // Act
        var response = await GetAppKeysForPortal(portalToTest!.Id, FusionContextApiData.InvalidContextId, UserType.Authenticated);

        // Assert
        Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
    }

    [TestMethod]
    public async Task Get_OnlyGlobalAppsForPortal_WithoutContext_AsAuthenticatedUser_ShouldReturnOk()
    {
        // Arrange
        var portals = await AssertGetAllPortals(UserType.Authenticated, HttpStatusCode.OK);
        var portalToTest = portals?.SingleOrDefault(x => x.Key == PortalData.InitialDbSeedData.ProjectExecution.Key);

        // Act
        var apps = await AssertGetAppsForPortal(portalToTest!.Id, null, UserType.Authenticated, HttpStatusCode.OK);

        // Assert
        Assert.IsNotNull(apps);
        Assert.AreEqual(4, apps.Count);
    }

    [TestMethod]
    public async Task Get_BothGlobalAndContextAppsForPortal_WithValidContext_AsAuthenticatedUser_ShouldReturnOk()
    {
        // Arrange
        var portals = await AssertGetAllPortals(UserType.Authenticated, HttpStatusCode.OK);
        var portalToTest = portals?.SingleOrDefault(x => x.Key == PortalData.InitialDbSeedData.ProjectExecution.Key);

        // Act
        var apps = await AssertGetAppsForPortal(portalToTest!.Id, FusionContextApiData.JcaContextId, UserType.Authenticated, HttpStatusCode.OK);

        // Assert
        Assert.IsNotNull(apps);
        Assert.AreEqual(6, apps.Count);
    }

    [TestMethod]
    public async Task Get_BothGlobalAndContextAppsForPortal_WithInvalidContext_AsAuthenticatedUser_ShouldReturn404()
    {
        // Arrange
        var portals = await AssertGetAllPortals(UserType.Authenticated, HttpStatusCode.OK);
        var portalToTest = portals?.SingleOrDefault(x => x.Key == PortalData.InitialDbSeedData.ProjectExecution.Key);

        // Act
        var response = await GetAppsForPortal(portalToTest!.Id, FusionContextApiData.InvalidContextId, UserType.Authenticated);

        // Assert
        Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
    }

    [TestMethod]
    public async Task Get_AppsForNonExistentPortal_AsAuthenticatedUser_ShouldReturnNotFound()
    {
        // Act & Assert
        var response = await GetAppsForPortal(Guid.NewGuid(), null, UserType.Authenticated);

        Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
    }

    [TestMethod]
    public async Task Get_AppsForPortal_WithoutContext_AsAnonymousUser_ShouldReturnUnauthorized()
    {
        // Act
        var apps = await AssertGetAppsForPortal(Guid.NewGuid(), null, UserType.Anonymous, HttpStatusCode.Unauthorized);

        // Assert
        Assert.IsNull(apps);
    }

    [TestMethod]
    public async Task Get_AppsForPortal_WithValidContext_AsAnonymousUser_ShouldReturnUnauthorized()
    {
        // Act
        var apps = await AssertGetAppsForPortal(Guid.NewGuid(), FusionContextApiData.JcaContextId, UserType.Anonymous, HttpStatusCode.Unauthorized);

        // Assert
        Assert.IsNull(apps);
    }

    [TestMethod]
    public async Task Get_PortalOnboardedApps_AsAuthenticatedUser_ShouldReturnOk()
    {
        // Arrange
        var portals = await AssertGetAllPortals(UserType.Authenticated, HttpStatusCode.OK);
        var portalToTest = portals!.First();

        // Act
        var response = await GetPortalOnboardedApps(portalToTest.Id, UserType.Authenticated);

        // Assert
        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

        var content = await response.Content.ReadAsStringAsync();
        var apps = JsonConvert.DeserializeObject<List<ApiPortalOnboardedApp>>(content);

        Assert.IsNotNull(apps);
        Assert.IsTrue(apps.Count > 0);
    }

    [TestMethod]
    public async Task Delete_Portal_AsAdministrator_ShouldReturnOk()
    {
        // Arrange
        var payload = new ApiCreatePortalRequest
        {
            Name = "Portal to be deleted",
            Description = "",
            ShortName = "Created short name",
            Subtext = "Created subtext",
            Icon = "Created icon",
            ContextTypes = [ContextTypeData.ValidContextTypes.ProjectMasterContextTypeKey]
        };

        await CreatePortal(UserType.Administrator, payload);
        var getAllAfterCreation = await AssertGetAllPortals(UserType.Administrator, HttpStatusCode.OK);
        var theOneCreatedToBeDeleted = getAllAfterCreation!.Last();

        // Act
        var response = await DeletePortal(theOneCreatedToBeDeleted.Id, UserType.Administrator);

        // Assert
        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

        // Verify the portal is actually deleted
        var deletedPortal = await AssertGetPortal(theOneCreatedToBeDeleted.Id, UserType.Authenticated, HttpStatusCode.NotFound);
        Assert.IsNull(deletedPortal);
    }

    [TestMethod]
    public async Task Delete_PortalWithApps_AsAdministrator_ShouldReturnForbidden()
    {
        // Arrange
        var portals = await AssertGetAllPortals(UserType.Administrator, HttpStatusCode.OK);
        var portalToDelete = portals?.SingleOrDefault(x => x.Key == PortalData.InitialDbSeedData.ProjectExecution.Key);

        // Ensure the portal has apps
        var apps = await AssertGetAppsForPortal(portalToDelete!.Id, FusionContextApiData.JcaContextId, UserType.Administrator, HttpStatusCode.OK);

        Assert.IsNotNull(apps);
        Assert.IsTrue(apps.Count > 0);

        // Act
        var response = await DeletePortal(portalToDelete.Id, UserType.Administrator);

        // Assert
        Assert.AreEqual(HttpStatusCode.Forbidden, response.StatusCode);

        // Verify the portal is not deleted
        var deletedPortal = await AssertGetPortal(portalToDelete.Id, UserType.Administrator, HttpStatusCode.OK);
        Assert.IsNotNull(deletedPortal);
    }

    [TestMethod]
    public async Task Delete_PortalApp_AsAdministrator_ShouldReturnOk()
    {
        // Arrange
        var portals = await AssertGetAllPortals(UserType.Administrator, HttpStatusCode.OK);
        var portalToTest = portals?.SingleOrDefault(x => x.Key == PortalData.InitialDbSeedData.ProjectExecution.Key);

        // Ensure the portal has apps
        var apps = await AssertGetAppsForPortal(portalToTest!.Id, FusionContextApiData.JcaContextId, UserType.Administrator, HttpStatusCode.OK);

        Assert.IsNotNull(apps);
        Assert.IsTrue(apps.Count > 0);

        var appToDelete = apps.First();

        // Act
        var response = await DeletePortalApp(portalToTest.Id, appToDelete, UserType.Administrator);

        // Assert
        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

        // Verify the app is actually deleted
        var deletedApp = await AssertGetPortalApp(portalToTest.Id, appToDelete, UserType.Authenticated, HttpStatusCode.NotFound);
        Assert.IsNull(deletedApp);
    }

    [TestMethod]
    public async Task Delete_PortalApp_AsAuthenticatedUser_ShouldReturnForbidden()
    {
        // Arrange
        var portals = await AssertGetAllPortals(UserType.Authenticated, HttpStatusCode.OK);
        var portalToTest = portals?.SingleOrDefault(x => x.Key == PortalData.InitialDbSeedData.ProjectExecution.Key);

        // Ensure the portal has apps
        var apps = await AssertGetAppsForPortal(portalToTest!.Id, FusionContextApiData.JcaContextId, UserType.Authenticated, HttpStatusCode.OK);

        Assert.IsNotNull(apps);
        Assert.IsTrue(apps.Count > 0);

        var appToDelete = apps.First();

        // Act
        var response = await DeletePortalApp(portalToTest.Id, appToDelete, UserType.Authenticated);

        // Assert
        Assert.AreEqual(HttpStatusCode.Forbidden, response.StatusCode);
    }

    [TestMethod]
    public async Task Delete_PortalApp_AsAnonymousUser_ShouldReturnUnauthorized()
    {
        // Arrange
        var portals = await AssertGetAllPortals(UserType.Authenticated, HttpStatusCode.OK);
        var portalToTest = portals?.SingleOrDefault(x => x.Key == PortalData.InitialDbSeedData.ProjectExecution.Key);

        // Ensure the portal has apps
        var apps = await AssertGetAppsForPortal(portalToTest!.Id, FusionContextApiData.JcaContextId, UserType.Authenticated, HttpStatusCode.OK);

        Assert.IsNotNull(apps);
        Assert.IsTrue(apps.Count > 0);

        var appToDelete = apps.First();

        // Act
        var response = await DeletePortalApp(portalToTest.Id, appToDelete, UserType.Anonymous);

        // Assert
        Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    #region Helpers

    private static async Task<ApiPortalApp?> AssertGetPortalApp(Guid portalId, string appKey, UserType userType, HttpStatusCode expectedStatusCode)
    {
        // Act
        var response = await GetPortalApp(portalId, appKey, userType);
        var content = await response.Content.ReadAsStringAsync();
        var app = JsonConvert.DeserializeObject<ApiPortalApp>(content);

        // Assert
        Assert.AreEqual(expectedStatusCode, response.StatusCode);

        if (response.StatusCode != HttpStatusCode.OK)
        {
            return null;
        }

        Assert.IsNotNull(content);
        AssertHelpers.AssertPortalAppValues(app);

        return app;
    }

    private static async Task<List<ApiPortal>?> AssertGetAllPortals(UserType userType, HttpStatusCode expectedStatusCode)
    {
        // Act
        var response = await GetAllPortals(userType);
        var content = await response.Content.ReadAsStringAsync();
        var portals = JsonConvert.DeserializeObject<List<ApiPortal>>(content);

        // Assert
        Assert.AreEqual(expectedStatusCode, response.StatusCode);

        if (response.StatusCode != HttpStatusCode.OK)
        {
            return portals;
        }

        Assert.IsNotNull(content);
        Assert.IsNotNull(portals);

        foreach (var portal in portals)
        {
            AssertHelpers.AssertPortalValues(portal);
            AssertHelpers.AssertAuditValues(portal, assertModified: false);
            Assert.AreEqual(0, portal.Apps.Count); // No relational data should be included in this request
        }

        return portals;
    }

    private static async Task<ApiPortal?> AssertGetPortal(Guid portalId, UserType userType, HttpStatusCode expectedStatusCode)
    {
        // Act
        var response = await GetPortal(portalId, userType);
        var content = await response.Content.ReadAsStringAsync();
        var portal = JsonConvert.DeserializeObject<ApiPortal>(content);

        // Assert
        Assert.AreEqual(expectedStatusCode, response.StatusCode);

        if (response.StatusCode != HttpStatusCode.OK)
        {
            return null;
        }

        Assert.IsNotNull(content);
        AssertHelpers.AssertPortalValues(portal);
        AssertHelpers.AssertPortalConfigurationValues(portal!.Configuration, acceptNullValues: true);
        AssertHelpers.AssertAuditValues(portal, assertModified: false);
        Assert.AreEqual(0, portal.Apps.Count); // No relational data should be included in this request

        return portal;
    }

    private static async Task<ApiPortalConfiguration?> AssertGetPortalConfiguration(Guid portalId, UserType userType, HttpStatusCode expectedStatusCode)
    {
        // Act
        var response = await GetPortalConfiguration(portalId, userType);
        var content = await response.Content.ReadAsStringAsync();
        var portalConfiguration = JsonConvert.DeserializeObject<ApiPortalConfiguration>(content);

        // Assert
        Assert.AreEqual(expectedStatusCode, response.StatusCode);

        if (response.StatusCode != HttpStatusCode.OK)
        {
            return portalConfiguration;
        }

        Assert.IsNotNull(content);
        Assert.IsNotNull(portalConfiguration);
        AssertHelpers.AssertPortalConfigurationValues(portalConfiguration, acceptNullValues: true);
        AssertHelpers.AssertAuditValues(portalConfiguration, assertModified: false);

        return portalConfiguration;
    }

    private static async Task<List<string>?> AssertGetAppKeysForPortal(Guid portalId, Guid? contextId, UserType userType, HttpStatusCode expectedStatusCode)
    {
        // Act
        var response = await GetAppKeysForPortal(portalId, contextId, userType);
        var content = await response.Content.ReadAsStringAsync();
        var appKeys = JsonConvert.DeserializeObject<List<string>>(content);

        // Assert
        Assert.AreEqual(expectedStatusCode, response.StatusCode);

        if (response.StatusCode != HttpStatusCode.OK)
        {
            return appKeys;
        }

        Assert.IsNotNull(content);
        Assert.IsNotNull(appKeys);

        foreach (var appKey in appKeys)
        {
            Assert.IsNotNull(appKey);
            Assert.IsInstanceOfType<string>(appKey);
        }

        return appKeys;
    }

    private static async Task<List<string>?> AssertGetAppsForPortal(Guid portalId, Guid? contextId, UserType userType, HttpStatusCode expectedStatusCode)
    {
        // Act
        var response = await GetAppsForPortal(portalId, contextId, userType);
        var content = await response.Content.ReadAsStringAsync();
        var appKeys = JsonConvert.DeserializeObject<List<string>>(content);

        // Assert
        Assert.AreEqual(expectedStatusCode, response.StatusCode);

        if (response.StatusCode != HttpStatusCode.OK)
        {
            return appKeys;
        }

        Assert.IsNotNull(content);
        Assert.IsNotNull(appKeys);

        foreach (var appKey in appKeys)
        {
            Assert.IsNotNull(appKey);
        }

        return appKeys;
    }

    private static async Task<HttpResponseMessage> CreatePortal(UserType userType, ApiCreatePortalRequest createdPortal)
    {
        var serializePayload = JsonConvert.SerializeObject(createdPortal);
        var content = new StringContent(serializePayload, Encoding.UTF8, "application/json");

        var client = TestFactory.Instance.GetHttpClient(userType);
        var response = await client.PostAsync($"{string.Format(Route)}", content);

        return response;
    }

    private static async Task<HttpResponseMessage> UpdatePortal(UserType userType, ApiUpdatePortalRequest updatedPortal, Guid portalId)
    {
        var serializePayload = JsonConvert.SerializeObject(updatedPortal);
        var content = new StringContent(serializePayload, Encoding.UTF8, "application/json");

        var client = TestFactory.Instance.GetHttpClient(userType);
        var response = await client.PutAsync($"{string.Format(Route)}/{portalId}", content);

        return response;
    }

    private static async Task<HttpResponseMessage> UpdatePortalConfiguration(UserType userType, ApiUpdatePortalConfigurationRequest updatedPortalConfiguration, Guid portalId)
    {
        var serializePayload = JsonConvert.SerializeObject(updatedPortalConfiguration);
        var content = new StringContent(serializePayload, Encoding.UTF8, "application/json");

        var client = TestFactory.Instance.GetHttpClient(userType);
        var response = await client.PutAsync($"{string.Format(Route)}/{portalId}/configuration", content);

        return response;
    }

    private static async Task<HttpResponseMessage> GetAllPortals(UserType userType)
    {
        var client = TestFactory.Instance.GetHttpClient(userType);
        var response = await client.GetAsync($"{Route}");

        return response;
    }

    private static async Task<HttpResponseMessage> GetPortal(Guid portalId, UserType userType)
    {
        var client = TestFactory.Instance.GetHttpClient(userType);
        var response = await client.GetAsync($"{Route}/{portalId}");

        return response;
    }

    private static async Task<HttpResponseMessage> GetPortalConfiguration(Guid portalId, UserType userType)
    {
        var client = TestFactory.Instance.GetHttpClient(userType);
        var response = await client.GetAsync($"{Route}/{portalId}/configuration");

        return response;
    }

    private static async Task<HttpResponseMessage> GetAppKeysForPortal(Guid portalId, Guid? contextId, UserType userType)
    {
        var route = contextId != null ? $"{Route}/{portalId}/contexts/{contextId}/appkeys" : $"{Route}/{portalId}/appkeys";
        var client = TestFactory.Instance.GetHttpClient(userType);
        var response = await client.GetAsync(route);

        return response;
    }

    private static async Task<HttpResponseMessage> GetAppsForPortal(Guid portalId, Guid? contextId, UserType userType)
    {
        var route = contextId != null ? $"{Route}/{portalId}/contexts/{contextId}/apps" : $"{Route}/{portalId}/apps";
        var client = TestFactory.Instance.GetHttpClient(userType);
        var response = await client.GetAsync(route);

        return response;
    }

    private static async Task<HttpResponseMessage> GetPortalOnboardedApps(Guid portalId, UserType userType)
    {
        var route = $"{Route}/{portalId}/onboarded-apps";
        var client = TestFactory.Instance.GetHttpClient(userType);
        var response = await client.GetAsync(route);

        return response;
    }

    private static async Task<HttpResponseMessage> DeletePortal(Guid portalId, UserType userType)
    {
        var route = $"{Route}/{portalId}";
        var client = TestFactory.Instance.GetHttpClient(userType);
        var response = await client.DeleteAsync(route);

        return response;
    }

    private static async Task<HttpResponseMessage> GetPortalApp(Guid portalId, string appKey, UserType userType)
    {
        var route = $"{Route}{portalId}/onboarded-apps/{appKey}";
        var client = TestFactory.Instance.GetHttpClient(userType);
        var response = await client.GetAsync(route);

        return response;
    }

    private static async Task<HttpResponseMessage> DeletePortalApp(Guid portalId, string appId, UserType userType)
    {
        var route = $"{Route}/{portalId}/apps/{appId}";
        var client = TestFactory.Instance.GetHttpClient(userType);
        var response = await client.DeleteAsync(route);

        return response;
    }

    #endregion Helpers
}
