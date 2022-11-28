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

            var workSurface1 = WorkSurfaceData.InitialSeedData.WorkSurface1;
            var workSurface2 = WorkSurfaceData.InitialSeedData.WorkSurface2;
            var workSurface3 = WorkSurfaceData.InitialSeedData.WorkSurface3;

            portal.AddWorkSurface(workSurface1);
            portal.AddWorkSurface(workSurface2);
            portal.AddWorkSurface(workSurface3);

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

            var collaborationAppGroup = WorkSurfaceAppGroupData.InitialSeedData.CollaborationAppGroup;
            var projectInformationAppGroup = WorkSurfaceAppGroupData.InitialSeedData.ProjectInformationAppGroup;
            var ccAppGroup = WorkSurfaceAppGroupData.InitialSeedData.CcAppGroup;
            var demoAppGroup = WorkSurfaceAppGroupData.InitialSeedData.DemoAppGroup;

            workSurface2.AddAppGroup(collaborationAppGroup);
            workSurface2.AddAppGroup(projectInformationAppGroup);
            workSurface2.AddAppGroup(ccAppGroup);
            workSurface2.AddAppGroup(demoAppGroup);

            dbContext.SaveChanges();

            // Add apps to work surfaces

            var meetingsWsApp = new WorkSurfaceApp(meetingsApp.Id, 0, workSurface2.Id);
            var reviewsWsApp = new WorkSurfaceApp(reviewsApp.Id, 1, workSurface2.Id);
            var tasksWsApp = new WorkSurfaceApp(tasksApp.Id, 0, workSurface2.Id);
            var orgChartWsApp = new WorkSurfaceApp(orgChartApp.Id, 1, workSurface2.Id);
            var handoverGardenWsApp = new WorkSurfaceApp(handoverGardenApp.Id, 0, workSurface2.Id);
            var workOrderGardenWsApp = new WorkSurfaceApp(workOrderGardenApp.Id, 1, workSurface2.Id);

            collaborationAppGroup.AddApp(meetingsWsApp);
            collaborationAppGroup.AddApp(reviewsWsApp);
            projectInformationAppGroup.AddApp(tasksWsApp);
            projectInformationAppGroup.AddApp(orgChartWsApp);
            ccAppGroup.AddApp(handoverGardenWsApp);
            ccAppGroup.AddApp(workOrderGardenWsApp);

            dbContext.SaveChanges();
        }
    }
}
