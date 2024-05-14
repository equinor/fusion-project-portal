using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using Equinor.ProjectExecutionPortal.Tests.WebApi.Data;
using Equinor.ProjectExecutionPortal.WebApi.Misc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
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
            // Create portals

            var workSurfaceWithoutApps = WorkSurfaceData.InitialSeedData.WorkSurface1;
            var workSurfaceWithApps = WorkSurfaceData.InitialSeedData.WorkSurface2;

            dbContext.AddRange(workSurfaceWithoutApps, workSurfaceWithApps);
               
            dbContext.SaveChanges();

            // Add apps groups

            var appGroupWithGlobalAppsOnly = AppGroupData.InitialSeedData.AppGroup1;
            var appGroupWithContextAppsOnly = AppGroupData.InitialSeedData.AppGroup2;
            var appGroupWithMixedApps = AppGroupData.InitialSeedData.AppGroup3;

            dbContext.AddRange(appGroupWithGlobalAppsOnly, appGroupWithContextAppsOnly, appGroupWithMixedApps);

            dbContext.SaveChanges();

            //add contextTypes
            var contextTypeProjectMaster = ContextTypeData.InitialSeedData.ContextType1;
            var contextTypeFacility = ContextTypeData.InitialSeedData.ContextType2;

            dbContext.AddRange(contextTypeProjectMaster,contextTypeFacility);

            dbContext.SaveChanges();

            // Add onboarded apps

            var meetingsApp = OnboardedAppsData.InitialSeedData.MeetingsApp;
            var reviewsApp = OnboardedAppsData.InitialSeedData.ReviewsApp;
            var tasksApp = OnboardedAppsData.InitialSeedData.TasksApp;
            var orgChartApp = OnboardedAppsData.InitialSeedData.OrgChartApp;
            var handoverGardenApp = OnboardedAppsData.InitialSeedData.HandoverGardenApp;
            var workOrderGardenApp = OnboardedAppsData.InitialSeedData.WorkOrderGardenApp;

            appGroupWithGlobalAppsOnly.AddApp(meetingsApp);
            appGroupWithGlobalAppsOnly.AddApp(reviewsApp);

            appGroupWithContextAppsOnly.AddApp(orgChartApp);
            appGroupWithContextAppsOnly.AddApp(handoverGardenApp);

            appGroupWithMixedApps.AddApp(workOrderGardenApp);
            appGroupWithMixedApps.AddApp(tasksApp);

            dbContext.SaveChanges();

            // Add onboarded contexts

            var jcaContext = OnboardedContextsData.InitialSeedData.JcaContext;

            dbContext.AddRange(jcaContext);
            dbContext.SaveChanges();

            // Add apps to work surface

            var globalMeetingsApp = new WorkSurfaceApp(meetingsApp.Id, workSurfaceWithApps.Id);
            var globalReviewsApp = new WorkSurfaceApp(reviewsApp.Id, workSurfaceWithApps.Id);
            var globalTasksApp = new WorkSurfaceApp(tasksApp.Id, workSurfaceWithApps.Id);

            var jcaContextOrgChartApp = new WorkSurfaceApp(orgChartApp.Id, workSurfaceWithApps.Id, jcaContext.Id);
            var jcaContextHandoverGardenApp = new WorkSurfaceApp(handoverGardenApp.Id, workSurfaceWithApps.Id, jcaContext.Id);

            var ogpContextWorkOrderGardenApp = new WorkSurfaceApp(workOrderGardenApp.Id, workSurfaceWithApps.Id);

            // Add context specific apps to work surfaces

            dbContext.AddRange(globalMeetingsApp, globalReviewsApp, globalTasksApp, jcaContextOrgChartApp, jcaContextHandoverGardenApp, ogpContextWorkOrderGardenApp);
            dbContext.SaveChanges();
        }
    }
}
