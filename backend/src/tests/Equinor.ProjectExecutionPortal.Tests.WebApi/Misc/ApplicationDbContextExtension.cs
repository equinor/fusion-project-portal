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
            // Create portals

            var portalWithoutApps = PortalData.InitialDbSeedData.PortfolioManagement;
            var portalWithApps = PortalData.InitialDbSeedData.ProjectExecution;

            dbContext.AddRange(portalWithoutApps, portalWithApps);
            dbContext.SaveChanges();

            // Add portal configuration

            portalWithoutApps.Configuration.Update(PortalConfigurationData.InitialDbSeedData.GenericPortalConfiguration.Router, PortalConfigurationData.InitialDbSeedData.GenericPortalConfiguration.Extension, PortalConfigurationData.InitialDbSeedData.GenericPortalConfiguration.Environment);
            portalWithApps.Configuration.Update(PortalConfigurationData.InitialDbSeedData.GenericPortalConfiguration.Router, PortalConfigurationData.InitialDbSeedData.GenericPortalConfiguration.Extension, PortalConfigurationData.InitialDbSeedData.GenericPortalConfiguration.Environment);

            // Add context types

            var contextTypeProjectMaster = ContextTypeData.InitialDbSeedData.ContextType1;
            var contextTypeFacility = ContextTypeData.InitialDbSeedData.ContextType2;

            // Connect portal with a context type
            portalWithApps.AddContextType(contextTypeProjectMaster);

            dbContext.AddRange(contextTypeProjectMaster, contextTypeFacility);
            dbContext.SaveChanges();

            // Add onboarded apps

            var meetingsApp = OnboardedAppData.InitialDbSeedData.MeetingsApp;
            var reviewsApp = OnboardedAppData.InitialDbSeedData.ReviewsApp;
            var tasksApp = OnboardedAppData.InitialDbSeedData.TasksApp;
            var orgChartApp = OnboardedAppData.InitialDbSeedData.OrgChartApp;
            var handoverGardenApp = OnboardedAppData.InitialDbSeedData.HandoverGardenApp;
            var workOrderGardenApp = OnboardedAppData.InitialDbSeedData.WorkOrderGardenApp;

            // Add apps

            dbContext.AddRange(meetingsApp, reviewsApp, tasksApp, orgChartApp, handoverGardenApp, workOrderGardenApp);
            dbContext.SaveChanges();

            // Add onboarded contexts

            var jcaContext = OnboardedContextData.InitialDbSeedData.JcaContext;
            var ogpContext = OnboardedContextData.InitialDbSeedData.OgpContext;

            dbContext.AddRange(jcaContext, ogpContext);
            dbContext.SaveChanges();

            // Add apps to portal

            var globalMeetingsApp = new PortalApp(meetingsApp.Id, portalWithApps.Id);
            var globalReviewsApp = new PortalApp(reviewsApp.Id, portalWithApps.Id);
            var globalTasksApp = new PortalApp(tasksApp.Id, portalWithApps.Id);

            var jcaContextOrgChartApp = new PortalApp(orgChartApp.Id, portalWithApps.Id, jcaContext.Id);
            var jcaContextHandoverGardenApp = new PortalApp(handoverGardenApp.Id, portalWithApps.Id, jcaContext.Id);

            var ogpContextWorkOrderGardenApp = new PortalApp(workOrderGardenApp.Id, portalWithApps.Id);

            // Add context specific apps to work surfaces

            dbContext.AddRange(globalMeetingsApp, globalReviewsApp, globalTasksApp, jcaContextOrgChartApp, jcaContextHandoverGardenApp, ogpContextWorkOrderGardenApp);
            dbContext.SaveChanges();
        }
    }
}
