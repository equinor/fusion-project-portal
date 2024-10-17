using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Data
{
    internal class PortalData
    {
        public class InitialDbSeedData
        {
            public static Portal PortfolioManagement = new(
                "portfolio-management",
                "Portfolio Management",
                "< DG 3",
                "Here you can find all the tools that you need",
                "A description",
                "<svg></svg>"
            );

            public static Portal ProjectExecution = new("project-execution",
                "Project Execution",
                "DG 3 - DG 4",
                "Go to this phase to work with projects that are beyond DG3",
                "A description",
                "<svg></svg>"
            );
        }
    }
}
