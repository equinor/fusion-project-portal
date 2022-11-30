using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using Equinor.ProjectExecutionPortal.Tests.WebApi.Data;
using Equinor.ProjectExecutionPortal.WebApi.Misc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Misc
{
    public static class ApplicationDbContextExtension
    {
        private const string SeederOid = "00000000-0000-0000-0000-999999999999";

        public static void CreateNewDatabaseWithCorrectSchema(this ProjectExecutionPortalContext dbContext)
        {
            //var migrations = dbContext.Database.GetPendingMigrations();
            //if (migrations.Any())
            //{
            //    dbContext.Database.Migrate();
            //}
        }

        public static void Seed(this ProjectExecutionPortalContext dbContext, IServiceProvider serviceProvider)
        {
            var userProvider = serviceProvider.GetRequiredService<CurrentUserProvider>();
            userProvider.SetCurrentUserOid(new Guid(SeederOid));

            SeedPortal(dbContext);
        }

        private static void SeedPortal(DbContext dbContext)
        {
            // Create portal

            var portal = PortalData.InitialSeedData.Portal;

            // Add work surfaces

            var workSurfaceWithoutApps = WorkSurfaceData.InitialSeedData.WorkSurface1;
            var workSurfaceWithApps = WorkSurfaceData.InitialSeedData.WorkSurface2;

            portal.AddWorkSurface(workSurfaceWithoutApps);
            portal.AddWorkSurface(workSurfaceWithApps);

            dbContext.Add(portal);
            dbContext.SaveChanges();

            // Add onboarded apps

            var meetingsApp = OnboardedAppsData.InitialSeedData.MeetingsApp;
            var reviewsApp = OnboardedAppsData.InitialSeedData.ReviewsApp;
            var tasksApp = OnboardedAppsData.InitialSeedData.TasksApp;
            var orgChartApp = OnboardedAppsData.InitialSeedData.OrgChartApp;
            var handoverGardenApp = OnboardedAppsData.InitialSeedData.HandoverGardenApp;
            var workOrderGardenApp = OnboardedAppsData.InitialSeedData.WorkOrderGardenApp;

            dbContext.AddRange(meetingsApp, reviewsApp, tasksApp, orgChartApp, handoverGardenApp, workOrderGardenApp);

            dbContext.SaveChanges();

            // Add apps groups to work surfaces

            var appGroupWithGlobalAppsOnly = WorkSurfaceAppGroupData.InitialSeedData.AppGroup1;
            var appGroupWithContextAppsOnly = WorkSurfaceAppGroupData.InitialSeedData.AppGroup2;
            var appGroupWithMixedApps = WorkSurfaceAppGroupData.InitialSeedData.AppGroup3;

            workSurfaceWithApps.AddAppGroup(appGroupWithGlobalAppsOnly);
            workSurfaceWithApps.AddAppGroup(appGroupWithContextAppsOnly);
            workSurfaceWithApps.AddAppGroup(appGroupWithMixedApps);

            dbContext.SaveChanges();

            // Add apps to work surface

            var globalMeetingsApp = new WorkSurfaceApp(meetingsApp.Id, 0, workSurfaceWithApps.Id);
            var globalReviewsApp = new WorkSurfaceApp(reviewsApp.Id, 1, workSurfaceWithApps.Id);
            var globalTasksApp = new WorkSurfaceApp(tasksApp.Id, 0, workSurfaceWithApps.Id);

            var jcaContextOrgChartApp = new WorkSurfaceApp(orgChartApp.Id, 1, workSurfaceWithApps.Id, FusionContextData.InitialSeedData.JcaExternalContextId, FusionContextData.InitialSeedData.ExternalContextType);
            var jcaContextHandoverGardenApp = new WorkSurfaceApp(handoverGardenApp.Id, 0, workSurfaceWithApps.Id, FusionContextData.InitialSeedData.JcaExternalContextId, FusionContextData.InitialSeedData.ExternalContextType);
            var anotherContextWorkOrderGardenApp = new WorkSurfaceApp(workOrderGardenApp.Id, 1, workSurfaceWithApps.Id, FusionContextData.InitialSeedData.AnotherExternalContextId, FusionContextData.InitialSeedData.ExternalContextType);

            // Add context specific apps to work surfaces

            appGroupWithGlobalAppsOnly.AddApp(globalMeetingsApp);
            appGroupWithGlobalAppsOnly.AddApp(globalReviewsApp);

            appGroupWithContextAppsOnly.AddApp(jcaContextOrgChartApp);
            appGroupWithContextAppsOnly.AddApp(jcaContextHandoverGardenApp);

            appGroupWithMixedApps.AddApp(globalTasksApp);
            appGroupWithMixedApps.AddApp(anotherContextWorkOrderGardenApp);

            dbContext.SaveChanges();
        }
    }
}
