using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps;
using Equinor.ProjectExecutionPortal.FusionPortalApi.Apps.Models;
using Equinor.ProjectExecutionPortal.Infrastructure;
using Equinor.ProjectExecutionPortal.Tests.WebApi.Data;
using Equinor.ProjectExecutionPortal.Tests.WebApi.Misc;
using Equinor.ProjectExecutionPortal.Tests.WebApi.Setup;
using Fusion.Integration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Moq;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi

{
    public sealed class TestFactory : WebApplicationFactory<Program>
    {
        private const string AuthenticatedUserOid = "00000000-0000-0000-0000-000000000007";
        private const string IntegrationTestEnvironment = "IntegrationTests";
        private readonly string _localDbConnectionString;
        private readonly string _configPath;
        private readonly List<Action> _teardownList = new();
        private readonly List<IDisposable> _disposables = new();
        private readonly Mock<IFusionPortalApiService> _fusionPortalApiServiceMock = new();
        private readonly Mock<IFusionContextResolver> _fusionContextResolverMock = new();
        public static Dictionary<UserType, ITestUser> TestUsersDictionary = new();
        private static TestFactory? _sInstance;
        private static readonly object _sPadlock = new();

        public static TestFactory Instance
        {
            get
            {
                if (_sInstance == null)
                {
                    lock (_sPadlock)
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

                services.AddScoped(_ => _fusionPortalApiServiceMock.Object);
                services.AddScoped(_ => _fusionContextResolverMock.Object);
            });

            builder.ConfigureServices(services =>
            {
                ReplaceRealDbContextWithTestDbContext(services);

                CreateSeededTestDatabase(services);

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

        private static void CreateSeededTestDatabase(IServiceCollection services)
        {
            using var serviceProvider = services.BuildServiceProvider();
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

            SeedData(dbContext, scopeServiceProvider);
        }

        private static void SeedData(ProjectExecutionPortalContext dbContext, IServiceProvider scopeServiceProvider)
        {
            dbContext.Seed(scopeServiceProvider);
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
            const string DbName = "ProjectPortalIntegrationTestsDB";
            var dbPath = Path.Combine(projectDir, $"{DbName}.mdf");

            // Set Initial Catalog to be able to delete database!
            return $"Server=(LocalDB)\\MSSQLLocalDB;Initial Catalog={DbName};Integrated Security=true;AttachDbFileName={dbPath}";
        }

        //private string GetSqlLiteConnectionString()
        //{
        //    return "\"Filename=:memory:\"";
        //}

        private void SetupServiceMock()
        {
            _fusionPortalApiServiceMock.Setup(service => service.TryGetFusionPortalApps())
                .Returns(Task.FromResult(FusionPortalAppsData.ValidFusionApps as IList<ApiFusionPortalAppInformation>));

            _fusionPortalApiServiceMock.Setup(service => service.TryGetFusionPortalApp(It.IsAny<string>()))
                .Returns(Task.FromResult(FusionPortalAppsData.ValidFusionApps.FirstOrDefault()));

            _fusionContextResolverMock.Setup(service => service.ResolveContextAsync(It.IsAny<ContextIdentifier>(), It.IsAny<FusionContextType>()))
                .Returns((ContextIdentifier contextIdentifier, FusionContextType type) =>
                {
                    return Task.FromResult(FusionContextData.ValidFusionContexts.FirstOrDefault(x => x.ExternalId == contextIdentifier.Identifier));
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
                            Oid = AuthenticatedUserOid
                        },
                });

        // TODO
        private static void SetupAdministratorUser()
            => TestUsersDictionary.Add(UserType.Administrator,
                new TestUser
                {
                    Profile =
                        new TokenProfile
                        {
                            FirstName = "Administrator",
                            LastName = "Administrator",
                            Oid = AuthenticatedUserOid,
                            AppRoles = new[] { "Fusion.ProjectPortal.Admin" }
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
}
