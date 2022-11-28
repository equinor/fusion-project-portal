using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Data
{
    internal class WorkSurfaceAppGroupData
    {
        public class InitialSeedData
        {
            public static WorkSurfaceAppGroup CollaborationAppGroup = new("Collaboration", 0, "#E24973");
            public static WorkSurfaceAppGroup ProjectInformationAppGroup = new("Project Information", 1, "#6D2FD5");
            public static WorkSurfaceAppGroup CcAppGroup = new("Construction and Commissioning", 2, "#0084C4");
            public static WorkSurfaceAppGroup DemoAppGroup = new("Demo", 3, "#00977B");
        }
    }
}
