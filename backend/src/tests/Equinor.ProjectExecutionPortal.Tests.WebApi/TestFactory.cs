using Equinor.ProjectExecutionPortal.Infrastructure;
using Equinor.ProjectExecutionPortal.Tests.WebApi.Data;
using Equinor.ProjectExecutionPortal.Tests.WebApi.Misc;
using Equinor.ProjectExecutionPortal.Tests.WebApi.Setup;
using Equinor.ProjectExecutionPortal.WebApi.Authorization;
using Fusion.Integration;
using Fusion.Integration.Apps.Abstractions.Abstractions;
using Fusion.Integration.Apps.Abstractions.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Moq;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi;

public sealed class TestFactory : WebApplicationFactory<Program>
{
    private const string IntegrationTestEnvironment = "IntegrationTests";
    private readonly string _localDbConnectionString;
    private readonly string _configPath;
    private readonly List<Action> _teardownList = [];
    private readonly List<IDisposable> _disposables = [];
    private readonly Mock<IFusionContextResolver> _fusionContextResolverMock = new();
    private readonly Mock<IAppsClient> _fusionAppsClientMock = new();
    public static Dictionary<UserType, ITestUser> TestUsersDictionary = new();
    private static TestFactory? _sInstance;
    private static readonly object SPadlock = new();

    public static TestFactory Instance
    {
        get
        {
            if (_sInstance == null)
            {
                lock (SPadlock)
                {
                    if (_sInstance == null)
                    {
                        _sInstance = new TestFactory();
                    }
                }
            }

            return _sInstance;
        }
    }

    private TestFactory()
    {
        var projectDir = Directory.GetCurrentDirectory();
        _localDbConnectionString = GetTestLocalDbConnectionString(projectDir);
        _configPath = Path.Combine(projectDir, "appsettings.json");
        SetupTestUsers();
    }

    public new void Dispose()
    {
        // Run teardown
        foreach (var action in _teardownList)
        {
            action();
        }

        foreach (var testUser in TestUsersDictionary)
        {
            testUser.Value.HttpClient.Dispose();
        }

        foreach (var disposable in _disposables)
        {
            try { disposable.Dispose(); } catch { /* Ignore */ }
        }

        //lock (s_padlock)
        //{
        //    s_instance = null;
        //}

        base.Dispose();
    }

    public HttpClient GetHttpClient(UserType userType)
    {
        var testUser = TestUsersDictionary[userType];

        SetupServiceMock();

        return testUser.HttpClient;
    }

    public TokenProfile? GetTestProfile(UserType userType) => TestUsersDictionary[userType].Profile;

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureTestServices(services =>
        {
            services.AddAuthentication()
                .AddScheme<IntegrationTestAuthOptions, IntegrationTestAuthHandler>(
                    IntegrationTestAuthHandler.TestAuthenticationScheme, _ => { });

            services.PostConfigureAll<JwtBearerOptions>(jwtBearerOptions =>
                jwtBearerOptions.ForwardAuthenticate = IntegrationTestAuthHandler.TestAuthenticationScheme);

            services.AddScoped(_ => _fusionContextResolverMock.Object);
            services.AddScoped(_ => _fusionAppsClientMock.Object);
        });

        builder.ConfigureServices(async services =>
        {
            ReplaceRealDbContextWithTestDbContext(services);

            await CreateSeededTestDatabase(services);

            EnsureTestDatabaseDeletedAtTeardown(services);
        });
    }

    private void ReplaceRealDbContextWithTestDbContext(IServiceCollection services)
    {
        var descriptor = services.SingleOrDefault
            (d => d.ServiceType == typeof(DbContextOptions<ProjectExecutionPortalContext>));

        if (descriptor != null)
        {
            services.Remove(descriptor);
        }

        services.AddDbContext<ProjectExecutionPortalContext>(options => options.UseSqlServer(_localDbConnectionString));
    }

    private static async Task CreateSeededTestDatabase(IServiceCollection services)
    {
        await using var serviceProvider = services.BuildServiceProvider();
        using var scope = serviceProvider.CreateScope();
        var scopeServiceProvider = scope.ServiceProvider;
        var dbContext = scopeServiceProvider.GetRequiredService<ProjectExecutionPortalContext>();

        dbContext.Database.EnsureDeleted();

        dbContext.Database.SetCommandTimeout(TimeSpan.FromMinutes(5));

        dbContext.CreateNewDatabaseWithCorrectSchema();

        var migrations = dbContext.Database.GetPendingMigrations();

        if (migrations.Any())
        {
            dbContext.Database.Migrate();
        }

        await SeedData(dbContext, scopeServiceProvider);
    }

    private static async Task SeedData(ProjectExecutionPortalContext dbContext, IServiceProvider scopeServiceProvider)
    {
        await dbContext.Seed(scopeServiceProvider);
    }

    private void EnsureTestDatabaseDeletedAtTeardown(IServiceCollection services)
        => _teardownList.Add(() =>
        {
            using var dbContext = DatabaseContext(services);
            dbContext.Database.EnsureDeleted();
        });

    private ProjectExecutionPortalContext DatabaseContext(IServiceCollection services)
    {
        services.AddDbContext<ProjectExecutionPortalContext>(options => options.UseSqlServer(_localDbConnectionString));

        var sp = services.BuildServiceProvider();
        _disposables.Add(sp);

        var spScope = sp.CreateScope();
        _disposables.Add(spScope);

        return spScope.ServiceProvider.GetRequiredService<ProjectExecutionPortalContext>();
    }

    private static string GetTestLocalDbConnectionString(string projectDir)
    {
        const string dbName = "ProjectPortalIntegrationTestsDB2";
        var dbPath = Path.Combine(projectDir, $"{dbName}.mdf");

        // Set Initial Catalog to be able to delete database!
        return $"Server=(LocalDB)\\MSSQLLocalDB;Initial Catalog={dbName};Integrated Security=true;AttachDbFileName={dbPath}";
    }

    //private string GetSqlLiteConnectionString()
    //{
    //    return "\"Filename=:memory:\"";
    //}

    private void SetupServiceMock()
    {
        _fusionAppsClientMock.Setup(service => service.GetAppsAsync(default))
            .Returns(Task.FromResult<IEnumerable<App>>(FusionAppApiData.ValidFusionApps));

        _fusionAppsClientMock.Setup(service => service.GetAppAsync(It.IsAny<string>(), default))
            .Returns((string appKey, CancellationToken token) =>
            {
                return Task.FromResult(FusionAppApiData.ValidFusionApps.FirstOrDefault(x => x.AppKey == appKey))!;
            });

        _fusionContextResolverMock.Setup(service => service.ResolveContextAsync(It.IsAny<ContextIdentifier>(), It.IsAny<FusionContextType>()))
            .Returns((ContextIdentifier contextIdentifier, FusionContextType type) =>
            {
                return Task.FromResult(FusionContextApiData.ValidFusionContexts.FirstOrDefault(x => x.ExternalId == contextIdentifier.Identifier));
            });

        _fusionContextResolverMock.Setup(service => service.GetContextAsync(It.IsAny<Guid>()))
            .Returns((Guid contextId) =>
            {
                return Task.FromResult(FusionContextApiData.ValidFusionContexts.FirstOrDefault(x => x.Id == contextId))!;
            });
    }

    private void SetupTestUsers()
    {
        SetupAnonymousUser();
        SetupAuthenticatedUser();
        SetupAdministratorUser();

        var webHostBuilder = WithWebHostBuilder(builder =>
        {
            builder.UseEnvironment(IntegrationTestEnvironment);
            builder.ConfigureAppConfiguration((_, conf) => conf
                .AddJsonFile(_configPath)
                .AddUserSecrets<Program>());
        });

        CreateAuthenticatedHttpClients(webHostBuilder);
    }

    private static void CreateAuthenticatedHttpClients(WebApplicationFactory<Program> webHostBuilder)
    {
        foreach (var testUser in TestUsersDictionary.Values)
        {
            testUser.HttpClient = webHostBuilder.CreateClient();

            AuthenticateUser(testUser);
        }
    }

    private static void SetupAuthenticatedUser()
        => TestUsersDictionary.Add(UserType.Authenticated,
            new TestUser
            {
                Profile =
                    new TokenProfile
                    {
                        FirstName = "Authenticated",
                        LastName = "Authenticated",
                        Oid = UserData.AuthenticatedUserId
                    },
            });

    private static void SetupAdministratorUser()
        => TestUsersDictionary.Add(UserType.Administrator,
            new TestUser
            {
                Profile =
                    new TokenProfile
                    {
                        FirstName = "Admini",
                        LastName = "Straterson",
                        Oid = UserData.AuthenticatedUserId,
                        AppRoles = [Scopes.ProjectPortalAdmin]
                    },
            });

    private static void SetupAnonymousUser() => TestUsersDictionary.Add(UserType.Anonymous, new TestUser { Profile = null });

    private static void AuthenticateUser(ITestUser user)
    {
        if (user.Profile != null)
        {
            user.HttpClient.DefaultRequestHeaders.Add("Authorization", user.Profile.CreateBearerToken());
        }
    }
}
